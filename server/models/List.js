const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    products: [{ 
        type: Schema.ObjectId, 
        ref: 'products' }]
  });

module.exports = mongoose.model("lists", listSchema); 
