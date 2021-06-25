const { scraperService } = require('../services/scraperService');

exports.scrap = async (req, res) => {
  const productUrl = req.body.productUrl;
  let scrapedProduct = null;
  
  scrapedProduct = await scraperService(productUrl);

  if(scrapedProduct.error) {
    console.log(scrapedProduct);
    res.status(500).json(scrapedProduct);
    return;
  }

  if(scrapedProduct) {
    res.status(200).json({
      ScrapedProduct: scrapedProduct,
      success: true
    })
  } else {
    res.status(500).json({error: {message: 'Error occurs while scrapping'}})
  }
}