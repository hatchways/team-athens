const express = require('express');
const router = express.Router();

const authRouter = require("./auth");
const userRouter = require("./user");
const listsRouter = require("./list");
const productsRouter = require("./products");

//manage all the routes here
router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/lists", listsRouter);
router.use("/products", productsRouter);

module.exports = router;