const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})


// @route POST /images
// @desc Upload images to cloudanary
// @access Private
exports.uploadImages = asyncHandler(async (req, res, next) => {


    res.status(200).json({ msg: "works" });
});
