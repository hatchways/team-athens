const express = require('express');
const protect = require('../middleware/auth');
const router = express.Router();

// get all
router.route('/').get(protect, (req, res)=>res.send());

// get unread
router.route('/unread').get(protect, (req, res)=>res.send());

// mark as read
router.route('/:notificationID').patch(protect, (req, res)=>res.send());

// create
router.route('/').post(protect, (req, res)=>res.send());

module.exports = router;