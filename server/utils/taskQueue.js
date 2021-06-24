const Queue = require("bull");
const Notification = require("../models/Notification");
const Product = require("../models/Product");
const List = require("../models/List");
const { scraperService } = require("../services/scraperService");
let jobsAreRunning = false;

// task to be accomplished on a regular basis
const processing = async (job) => {
  const { product, userId } = job;

  if (!product) {
    throw new Error("Product<Product> couldn't be null");
  }

  if (!userId) {
    throw new Error("UserId<string> couldn't be null");
  }

  let scrapedProduct = null;

  scrapedProduct = await scraperService(product.url);

  if (scrapedProduct.error) {
    console.error(scrapedProduct.error.message || scrapedProduct.error);
    return;
  }

  if (scrapedProduct) {
    let productPrice = product.price.match("/d+/g");
    let scrapedProductPrice = scrapedProduct.productPrice.match("/d+/g");

    if (scrapedProductPrice < productPrice) {
      Notification.create(
        {
          title: "New Price",
          message: `Product ${product.name} is on special offer!`,
          receiver: userId,
          oldPrice: product.price,
          newPrice: scrapedProduct.productPrice,
          url: product.url,
          image: product.pictureUrl,
        },
        (error, reply) => {
          if (error) {
            throw new Error(error);
          }
        }
      );
    }

    product.price = scrapedProduct.productPrice;
    return Product.updateOne(
      {
        _id: product._id,
      },
      product,
      (error, reply) => {
        if (error) {
          throw new Error(error);
        }
      }
    );
  } else {
    console.log("scraped product is null");
  }
};

/**
 * queues a scraping job
 * @param product the product added to a list / for which we are creating a job
 * @param userId userId must be the _id of the list the product belogns to
 */
const createScrapingJob = ({ product, userId }) => {
  const queueOptions = {
    redis: {
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
      password: process.env.REDIS_PASSWORD,
    },
  };

  // "At every 15th minute" this defines at what interval a task will be executed
  const cron = "*/15 * * * *";

  const job = new Queue(product._id, queueOptions);
  job
    .add(
      processing({
        product,
        userId,
      }),
      {
        repeat: {
          cron: cron,
        },
      }
    )
    .catch((error) => {
      return;
    });
};

/**
 * inits jobs when app is launched
 */
const initScrapingJobs = async () => {
  if (jobsAreRunning) return;

  const lists = await List.find();

  if (lists) {
    lists.forEach((list) => {
      list.products.forEach(async (productId) => {
        const product = await Product.findById(productId);

        if (product) {
          createScrapingJob({
            product: product,
            userId: list.creator,
          });
        } else {
          console.error(`can't found product with _id=${productId}`);
        }
      });
    });
  }

  jobsAreRunning = true;
};

module.exports = {
  createScrapingJob,
  initScrapingJobs,
};
