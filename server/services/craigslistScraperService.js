const puppeteer = require("puppeteer");

/*
price -> .price
title -> #titletextonly
main title -> .swipe-wrap>div>img
post details -> #postingbody
*/




exports.getProductDetail = async (productUrl) => {
  if (productUrl) {
    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(productUrl, { waitUntil: "domcontentloaded" });

      const productData = await page.evaluate(() => {
        //product description
        // .replaceAll('\n', ' ') for removing the new lines
        const postBody = document.querySelector("#postingbody").innerText;

        //product price
        let price = "unavailable";

        try {
          price = document.querySelector(".price").innerText;
        } catch (error) {
          console.log("Price not availble for this product");
          throw new Error(error);
        }
        //product title
        const title = document.querySelector("#titletextonly").innerText;

        // product image
        const image = document.querySelector(".swipe-wrap>div>img").src;

        return {
          productTitle: title,
          productImage: image,
          productDetails: postBody,
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