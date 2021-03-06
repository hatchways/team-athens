const express = require("express");
const {
  getAll,
  getUnread,
  markAsread,
  create,
  markAllAsRead,
} = require("../controllers/notification");
const protect = require("../middleware/auth");
const router = express.Router();

// get all
router.route("/").get(protect, getAll);

// get unread
router.route("/unread").get(protect, getUnread);

// mark all as read
router.route("/mark-all-as-read").patch(protect, markAllAsRead);

// mark as read
router.route("/:notificationID").patch(protect, markAsread);

// create
router.route("/").post(protect, create);

module.exports = router;
