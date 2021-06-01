const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    products: [{ 
        type: Schema.ObjectId, 
        ref: 'Product' }]
  });

module.exports = mongoose.model("lists", listSchema); 
