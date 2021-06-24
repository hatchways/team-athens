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
  userIds: [{
    type: mongoose.Schema.ObjectId,
    ref: 'users'
  }],
  imageUrl: {
    type: String
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'users'
  },
  isPrivate: {
    type: Boolean,
    default: true,
    required: true,
  },
});

module.exports = List = mongoose.model("lists", listSchema);
