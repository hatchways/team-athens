const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const path = require('path');
const cloudinary = require('../utils/cloudinary')

// @route POST /images
// @desc Upload images to cloudanary
// @access Private
exports.uploadImages = asyncHandler(async (req, res, next) => {
    let picturesPromiseList = req.files.map((pic) =>
        cloudinary.uploader.upload(pic.path)
    );

    let responses = await Promise.all(picturesPromiseList);

    res.status(200).json({ msg: "All image(s) uploaded successfully.", images: responses });
});
