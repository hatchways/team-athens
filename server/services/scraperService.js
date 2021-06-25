const {
  getProductDetail: getProductDetailAmazonService
} = require('../services/amazonScraperService');
const {
  getProductDetail: getProductDetailCraiglistService
} = require('../services/craigslistScraperService');
const {
  getProductDetail: getProductDetailEbayService
} = require('../services/ebayScraperService');

exports.scraperService = async (productUrl) => {
  let scrapedProduct = null;
  const SITES_REGEX = {
    amazon: new RegExp('(http:\/\/|https:\/\/)?(www\.)?amazon(\..{2,})', 'gi'),
    ebay: new RegExp('(http:\/\/|https:\/\/)?(www\.)?ebay(\..{2,})', 'gi'),
    craiglist: new RegExp('(http:\/\/|https:\/\/)?(www\.)?craigslist(\..{2,})', 'gi'),
  }
  if (SITES_REGEX.amazon.test(productUrl)) {
    await getProductDetailAmazonService(productUrl).then((data) => {
      scrapedProduct = data;
    });
  } else if (SITES_REGEX.craiglist.test(productUrl)) {
    await getProductDetailCraiglistService(productUrl).then((data) => {
      scrapedProduct = data;
    });
  } else if (SITES_REGEX.ebay.test(productUrl)) {
    await getProductDetailEbayService(productUrl).then((data) => {
      scrapedProduct = data;
    });
  } else {
    return {error: {message: 'Url not in considered websites'}}
  }

  return scrapedProduct;
}