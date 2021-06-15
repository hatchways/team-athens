const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    products: [{ 
        type: Schema.ObjectId, 
        ref: 'products' }],
    userId: [{
      type: Schema.ObjectId, 
      required: true,
      ref: 'user'
    }]
  });

module.exports = mongoose.model("lists", listSchema); 
