const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        const fileExtention = path.extname(file.originalname)
        const fileName = path.basename(file.originalname, fileExtention)
        cb(null, fileName + '-' + Date.now() + fileExtention);
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
}).array('photos', 12);

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// @route POST /images
// @desc Upload images to cloudanary
// @access Private
exports.uploadImages = asyncHandler(async (req, res, next) => {
    console.log(req.file)

    /*
        - get file from req 
        - upload to cloudinary
        - wait for upload to finish
        - send back url in res
    */

    /*
        -- other features
        - make sure it's an image

    */

    upload(req, res, (err) => {
        console.log(req.files)

        res.status(200).json({
            msg: "File Uploaded!",
            file: `uploads/file`
        });

    });

    // res.status(200).json({ msg: "works" });
});
