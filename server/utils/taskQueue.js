const Queue = require('bull');

const processing = (job) => {
  const {
    product,
    user_id
  } = job.data;

  /**
   * 1. get product source
   * 2. call the corresponding scrapping service
   * 3. compare product current price and scraped prices
   *  if product scraped sale price is lower than current product price
   *    then send notification to user_id
   * 4. update product price on db
   * 5. return a promise
   */

}


/**
 * @param product the product added to a list / for which we are creating a job
 * @param user_id user_id must be the _id of the list the product belogns to 
 */
const createScrapingJob = ({
  product,
  user_id
}) => {

  const queueOptions = {
    redis: {
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
      password: process.env.REDIS_PASSWORD
    }
  };

  const cron = '*/15 * * * *';

  const job = new Queue(product._id, queueOptions);
  job.add(processing({
    product,
    user_id
  }), {
    repeat: {
      cron: cron,
    }
  });
}

const initScrapingJobs = async () => {
  /**
   * fetch lists
   * for list of list
   *   for each product of list's product
   *      createScrapingJob({product: product, user_id: list.user_id})
   */
}

module.exports = {
  createScrapingJob,
  initScrapingJobs
};