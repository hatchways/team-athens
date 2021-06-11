const expressAsyncHandler = require("express-async-handler");
const Notification = require("../models/Notification");
const User = require("../models/User");

exports.getAll = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401).send("Unathenticated");
    throw new Error("Not authorized");
  }

  const notifications = await Notification.find({
    receiver: user._id,
  });
  res.status(200).json({
    success: {
      notifications: notifications,
    }
  });
});

exports.getUnread = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401).send("Unathenticated");
    throw new Error("Not authorized");
  }

  const notifications = await Notification.find({
    receiver: user._id,
    read: false,
  });
  res.status(200).json({
    success: {
      notifications: notifications,
    }
  });
});

exports.markAsread = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401).send("Unathenticated");
    throw new Error("Not authorized");
  }


  const notificationId = req.params.notificationID
  const notification = await Notification.findOne({
    _id: notificationId,
    receiver: user._id,
  });

  if (!notification) {
    res.status(404).json({
      error: {
        message: "Not found",
      }
    });
    throw new Error('Not found');
  }

  notification.read = true;
  notification.read_date = new Date().toString();
  await Notification.updateOne({
    _id: notificationId
  }, (error, reply) => {
    if (error) {
      res.status(500).json({
        error: {
          message: error,
        }
      });
    } else {
      res.status(201).json({
        success: {
          message: "Notification updated",
        }
      });
    }
  });
});

// i'm not sure this is useful as notifications are going to be created on some internal events
exports.create = expressAsyncHandler(async (req, res, next) => {
  Notification.create(req.body, (error, reply) => {
    if (error) {
      res.status(500).json({
        error: {
          message: error,
        }
      });
    } else {
      res.status(201).json({
        success: {
          message: "Notification created",
        }
      });
    }
  })
})