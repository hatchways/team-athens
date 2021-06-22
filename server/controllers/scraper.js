const { scraperService } = require('../services/scraperService');

exports.scrap = async (req, res) => {
  const productUrl = req.body.productUrl;
  let scrapedProduct = null;
  
  scrapedProduct = await scraperService(productUrl);

  if(scrapedProduct.error) {
    res.status(500).json(scrapedProduct.error.message);
    return;
  }

  if(scrapedProduct) {
    console.log(scrapedProduct);
    res.status(200).json({
      ScrapedProduct: scrapedProduct,
      success: true
    })
  } else {
    res.status(500).json({error: {message: 'Error occurs while scrapping'}})
  }
}