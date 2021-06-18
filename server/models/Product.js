const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  url: {
    type: String,
    required: true
  },
  pictureUrl: {
    type: String,
  },
  price: {
    type: String,
    required: true
  }
});

module.exports = Product = mongoose.model("products", productSchema);