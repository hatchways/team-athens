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
    return res.status(403).json({
      msg: "you can't follow yourself",
      err: null,
      success: false,
    });
  }
  try {
    const user = await User.findOne({ username: otherUsername });
    const currentuser = await User.findOne({ username: currentUsername });

    // check if ur already following this user
    if (user.followers.includes(currentuser._id)) {
      return res.status(403).json({
        msg: "you already follow this user",
        err: null,
        success: false,
      });
    }
    // follow
    await user.updateOne({ $push: { followers: currentuser._id } });
    await currentuser.updateOne({ $push: { followings: user._id } });

    res.status(200).json({
      msg: `${currentuser.username} is now following ${user.username}`,
      err: null,
      success: true,
    });

  } catch (err) {
    res.status(500).json({
      msg: "error",
      err: err,
      success: false,
    });
  }
});

// @route PUT /users/:username/unfollow
// @desc Unfollow a user
// @access Private
exports.unfollowUser = asyncHandler(async (req, res, next) => {
  const currentUsername = req.body.username;
  const otherUsername = req.params.username;

  if (otherUsername === currentUsername) {
    return res.status(403).json({
      msg: "you can't unfollow yourself",
      err: null,
      success: false,
    });
  }

  try {
    const user = await User.findOne({ username: otherUsername });
    const currentuser = await User.findOne({ username: currentUsername });

    if (!user.followers.includes(currentuser._id)) {
      return res.status(403).json({
        msg: "you are not following this user",
        err: null,
        success: false,
      });
    }

    await user.updateOne({ $pull: { followers: currentuser._id } });
    await currentuser.updateOne({ $pull: { followings: user._id } });

    res.status(200).json({
      msg: `${currentuser.username} has unfollowed ${user.username}`,
      err: null,
      success: true,
    });
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

    // // get all user data
    const followers = [];
    for (const f of currentUser.followers) {
      followers.push(await User.findById({ _id: f }));
    }

    const sanitizedData = followers.map(val => {
      return {
        username: val.username,
        email: val.email,
        _id: val._id,
        followings: val.followings,
        followers: val.followers,
      };
    });

    res.status(200).json(sanitizedData);
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

    // // get all user data
    const followings = [];
    for (const f of currentUser.followings) {
      followings.push(await User.findById({ _id: f }));
    }

    const sanitizedData = followings.map(val => {
      return {
        username: val.username,
        email: val.email,
        _id: val._id,
        followings: val.followings,
        followers: val.followers,
      };
    });

    res.status(200).json(sanitizedData);
  } catch (err) {
    res.status(500).json(err)
  }
});
