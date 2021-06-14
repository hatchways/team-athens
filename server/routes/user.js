const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { searchUsers, followUser, unfollowUser, followers, followings, followSugestions } = require("../controllers/user");
const User = require("../models/User");

router.route("/").get(protect, searchUsers);

router.put('/:username/follow', protect, followUser);

router.put('/:username/unfollow', protect, unfollowUser);

router.get('/:username/followers', protect, followers);

router.get('/:username/followings', protect, followings);

router.get('/:username/followSugestions', protect, followSugestions);

module.exports = router;
