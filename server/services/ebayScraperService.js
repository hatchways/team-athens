const puppeteer = require("puppeteer");

exports.getProductDetail = async (productUrl) => {
  if (productUrl) {
    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(productUrl, { waitUntil: "domcontentloaded" });

      const productData = await page.evaluate(() => {
        //product description
        // uncomment if we decide to include post description later
        // const postBody = document.querySelector("#postingbody").innerText.replaceAll('\n', ' ');

        //product price
        let price = "unavailable";

        try {
          price = document.getElementById("prcIsum").innerText;
        } catch (error) {
          console.log("Price not availble for this product");
          throw new Error(error);
        }
        //product title
        const title = document.getElementsByClassName("it-ttl")[0].innerText;

        // product image
        const image = document.getElementById("icImg").src;

        return {
          productTitle: title,
          productImage: image,
          productPrice: price,
        };
      });

      await browser.close();
      productData.url = productUrl;
      Object.freeze(productData);
      return productData;
    } catch (error) {
      throw new Error(error);
    }
  } else {
    throw new Error("Product url not provided");
  }
};
