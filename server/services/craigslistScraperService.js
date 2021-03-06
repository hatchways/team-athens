const puppeteer = require("puppeteer");

exports.getProductDetail = async (productUrl) => {
  if (productUrl) {
    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
      await page.goto(productUrl, { waitUntil: "domcontentloaded" });

      const productData = await page.evaluate(() => {
        //product description
        // uncomment if we decide to include post description later
        // const postBody = document.querySelector("#postingbody").innerText.replaceAll('\n', ' ');

        //product price
        let price = "unavailable";

        try {
          price = document.querySelector(".price").innerText;
        } catch (error) {
          return {error: {message: "Price not availble for this product"}}
        }
        //product title
        const title = document.querySelector("#titletextonly").innerText;

        // product image
        const image = document.querySelector(".swipe-wrap>div>img").src;

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
      return {error: {message: error}}
    }
  } else {
    throw new Error("Product url not provided");
  }
};