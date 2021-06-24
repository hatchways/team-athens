const express = require("express");
const { scrap } = require("../controllers/scraper");
const protect = require("../middleware/auth");
const router = express.Router();

router.route("/").post(protect, scrap);

module.exports = router;
