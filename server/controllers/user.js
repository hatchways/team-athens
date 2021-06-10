const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @route POST /users
// @desc Search for users
// @access Private
exports.searchUsers = asyncHandler(async (req, res, next) => {
  const searchString = req.query.search;

  let users;
  if (searchString) {
    users = await User.find({
      username: { $regex: searchString, $options: "i" }
    });
  }

  if (!users) {
    res.status(404);
    throw new Error("No users found in search");
  }

  res.status(200).json({ users: users });
});

// @route PUT /users/:username/follow
// @desc Follow a user
// @access Private
exports.followUser = asyncHandler(async (req, res, next) => {
  const currentUsername = req.body.username;
  const otherUsername = req.params.username;

  // early exit
  if (otherUsername === currentUsername) {
    res.status(403).json("you can't follow yourself");
    next();
  }
  try {
    const user = await User.findOne({ username: otherUsername });
    const currentuser = await User.findOne({ username: currentUsername });

    // check if ur already following this user
    if (user.followers.includes(currentuser._id)) {
      res.status(403).json("you already follow this user");
      next();
    }
    // follow
    await user.updateOne({ $push: { followers: currentuser._id } });
    await currentuser.updateOne({ $push: { followings: user._id } });

    res.status(200).json(`${currentuser.username} is now following ${user.username}`)

  } catch (err) {
    res.status(500).json(err);
  }
});

// @route PUT /users/:username/unfollow
// @desc Unfollow a user
// @access Private
exports.unfollowUser = asyncHandler(async (req, res, next) => {
  const currentUsername = req.body.username;
  const otherUsername = req.params.username;

  if (otherUsername === currentUsername) {
    res.status(403).json("you can't unfollow yourself");
    next();
  }

  try {
    const user = await User.findOne({ username: otherUsername });
    const currentuser = await User.findOne({ username: currentUsername });

    if (!user.followers.includes(currentuser._id)) {
      res.status(403).json("you are not following this user");
      next();
    }

    await user.updateOne({ $pull: { followers: currentuser._id } });
    await currentuser.updateOne({ $pull: { followings: user._id } });

    res.status(200).json(`${currentuser.username} has unfollowed ${user.username}`)
  } catch (err) {
    res.status(500).json(err);
  }
});

// @route GET /users/:username/followers
// @desc Get followers list
// @access Private
exports.followers = asyncHandler(async (req, res, next) => {
  try {
    const username = req.params.username;

    const currentUser = await User.findOne({ username: username });
    res.status(200).json(currentUser.followers);
  } catch (err) {
    res.status(500).json(err)
  }
});

// @route GET /users/:username/followings
// @desc Get followings list
// @access Private
exports.followings = asyncHandler(async (req, res, next) => {
  try {
    const username = req.params.username;

    const currentUser = await User.findOne({ username: username });
    res.status(200).json(currentUser.followings);
  } catch (err) {
    res.status(500).json(err)
  }
});