const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  products: [{
    type: mongoose.Schema.ObjectId,
    ref: 'products'
  }],
  userId: [{
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'users'
  }]
});

module.exports = List = mongoose.model("lists", listSchema);
