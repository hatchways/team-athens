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
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'products',
  },
  old_price: {
    type: Number,
    required: false,
  },
  new_price: {
    type: Number,
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