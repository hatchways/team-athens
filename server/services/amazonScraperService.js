const puppeteer = require("puppeteer");

exports.getProductDetail = async (productUrl) => {
  if (productUrl) {
    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(productUrl, { waitUntil: "domcontentloaded" });

      const productData = await page.evaluate(() => {
        let price = "unavailable";

        try {
          try {
            // this become the regular price when product in sale
            price = document.querySelector(
              "span.priceBlockStrikePriceString.a-text-strike"
            ).innerText;
          } catch (error) {
            price = document.querySelector(
              "span#priceblock_ourprice"
            ).innerText;
          }

          // check if price is not like $xx.xx - $xx.xx format
          const regex = /(.\d+\.\d+)\s-\s(.\d+\.\d+)/gm;
          if (price.match(regex)) {
            let match = regex.exec(price);
            price = match[2];
          }
        } catch (error) {
          return {error: {message: "Price not availble for this product"}}
        }

        return {
          productImage: document.querySelector("img#landingImage").src,
          productTitle: document.querySelector("span#productTitle").innerText,
          productPrice: price,
        };
      });

      await browser.close();
      productData.url = productUrl;
      Object.freeze(productData);

      return productData;
    } catch (error) {
      return {error: {message: error}}
    }
  } else {
    throw new Error("Product url not provided");
  }
};
