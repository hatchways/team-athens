const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { searchUsers, followUser, unfollowUser, followers, followings, followSugestions } = require("../controllers/user");
const User = require("../models/User");

router.route("/").get(protect, searchUsers);

router.put('/:username/follow', protect, followUser);

router.put('/:username/unfollow', protect, unfollowUser);

router.get('/followers', protect, followers);

router.get('/followings', protect, followings);

router.get('/followSugestions', protect, followSugestions);

module.exports = router;
