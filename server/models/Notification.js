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
  old_price: {
    type: String,
    required: false,
  },
  new_price: {
    type: String,
    required: false,
  },
  read: {
    type: Boolean,
    required: true,
    default: false,
  },
  read_date: {
    type: Date,
    required: false,
    default: null,
  },
  create_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = Notification = mongoose.model('notifications', notificationSchema);