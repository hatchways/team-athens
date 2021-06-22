const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
  image: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
  oldPrice: {
    type: String,
    required: false,
  },
  newPrice: {
    type: String,
    required: false,
  },
  read: {
    type: Boolean,
    required: true,
    default: false,
  },
  createDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = Notification = mongoose.model('notifications', notificationSchema);