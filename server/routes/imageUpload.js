const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const upload = require("../utils/multer");
const { uploadImages } = require("../controllers/imageUpload");

router.route("/").post(protect, upload.array('images'), uploadImages);
module.exports = router;
