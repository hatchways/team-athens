const express = require("express");
const {
  getPublicLists,
  getListProducts,
} = require("../controllers/publicProfiles");
const router = express.Router();
const protect = require("../middleware/auth");

router.route("/").get(protect, getPublicLists);
router.route("/:listId/products").get(protect, getListProducts);

module.exports = router;
