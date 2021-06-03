const puppeteer = require("puppeteer");

exports.getProductDetail = async (productUrl) => {
  if (productUrl) {
    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(productUrl, { waitUntil: "domcontentloaded" });

      const productData = await page.evaluate(() => {
        const featuresUlElem = document
          .querySelector("div#feature-bullets")
          .querySelector("ul");
        const featuresLiElem = Array.from(
          featuresUlElem.querySelectorAll("li")
        );

        const features = featuresLiElem.map((liElem) => {
          return liElem.innerText;
        });

        let price = "unavailable";

        try {
          price = document.querySelector("span#priceblock_ourprice").innerText;
        } catch (error) {
          console.log("Price not availble for this product");
          throw new Error(error);
        }

        return {
          productImage: document.querySelector("img#landingImage").src,
          productTitle: document.querySelector("span#productTitle").innerText,
          productFeatures: features,
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
