const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const path = require('path');
const cloudinary = require('../utils/cloudinary')

// @route POST /images
// @desc Upload images to cloudanary
// @access Private
exports.uploadImages = asyncHandler(async (req, res, next) => {
    // console.log(req.files);
    const imageData = [];
    for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);

        imageData.push(result);
    }

    res.status(200).json({ msg: "All image(s) uploaded successfully.", images: imageData });
});
