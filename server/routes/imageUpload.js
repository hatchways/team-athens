const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { uploadImages } = require("../controllers/imageUpload");

router.route("/").post(protect, uploadImages);
module.exports = router;
