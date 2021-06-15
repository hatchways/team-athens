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
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  });

module.exports = mongoose.model("products", productSchema);
