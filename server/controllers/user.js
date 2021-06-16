const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const projection = {
  username: 1,
  email: 1,
  _id: 1,
  followings: 1,
  followers: 1,
};

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
  const currentUserId = req.user.id;
  const otherUsername = req.params.username;

  try {
    const user = await User.findOne({ username: otherUsername });
    const currentuser = await User.findOne({ _id: currentUserId });

    // early exit
    if (otherUsername === currentuser.username) {
      return res.status(403).json({
        msg: "you can't follow yourself",
        err: null,
        success: false,
      });
    }

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
  const currentUserId = req.user.id;
  const otherUsername = req.params.username;

  try {
    const user = await User.findOne({ username: otherUsername });
    const currentuser = await User.findOne({ _id: currentUserId });

    if (otherUsername === currentuser.username) {
      return res.status(403).json({
        msg: "you can't unfollow yourself",
        err: null,
        success: false,
      });
    }

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
    const currentUser = await User.findOne({ _id: req.user.id });

    // // get all user data
    const followers = [];
    for (const follower of currentUser.followers) {
      const user = await User.find({ _id: follower }, projection);
      followers.push(user[0]);
    }

    res.status(200).json(followers);
  } catch (err) {
    res.status(500).json(err)
  }
});

// @route GET /users/followings
// @desc Get followings list
// @access Private
exports.followings = asyncHandler(async (req, res, next) => {
  try {
    const currentUser = await User.findOne({ _id: req.user.id });

    // // get all user data
    const followings = [];
    for (const f of currentUser.followings) {
      const t = await User.find({ _id: f }, projection);
      followings.push(t[0]);
    }

    res.status(200).json(followings);
  } catch (err) {
    res.status(500).json(err)
  }
});

// @route GET /users/followSuggestions
// @desc Get follow Suggestions list
// @access Private
exports.followSugestions = asyncHandler(async (req, res, next) => {
  try {
    const currentUser = await User.findOne({ _id: req.user.id });

    // filter users that u already follow
    const allUsers = await User.find({}, projection);

    const filteredUsers = [];

    for (let user of allUsers) {
      const userId = user._id;
      //check if self
      if (userId.equals(currentUser._id)) {
        continue;
      }

      let foundFollower = false
      // check if it's in the followers list
      for (let follower of currentUser.followings) {
        if (userId.equals(follower)) {
          foundFollower = true;
        }
      }

      if (!foundFollower)
        filteredUsers.push(user);
    }

    res.status(200).json(filteredUsers);
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});