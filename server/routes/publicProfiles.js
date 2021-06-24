const express = require("express");
const { getPublicLists, getListProducts } = require("../controllers/publicProfiles");
const router = express.Router();

router.route("/").get(getPublicLists);
router.route("/:listId/products").get(getListProducts);

module.exports = router;