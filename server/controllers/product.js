const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const List = require("../models/List");

// @route GET /products/:listId
// @desc Get all products from a specific list 
// @access Private
exports.getAllProducts = expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const listId = req.params.listId;

    if (!user) {
        res.status(401).send("Unathenticated");
        throw new Error("Not authorized");
    }

    const list = await List.findOne({ _id: listId });
    const products = await Product.find({ _id: list.products });

    res.status(200).json({
        success: {
            message: "found",
            products: products
        }
    });
});

// @route GET /products/:listId/:productId
// @desc Get a product from a specific list 
// @access Private
exports.getProductById = expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const listId = req.params.listId;
    const productId = req.params.productId;

    if (!user) {
        res.status(401).send("Unathenticated");
        throw new Error("Not authorized");
    }

    const list = await List.findOne({ _id: listId });
    const products = list.products

    const id = products.find(product => product.equals(productId));

    if (!id) {
        return res.status(400).json({
            msg: 'productnot found'
        });
    }

    const product = await Product.findById({ _id: id });

    res.status(200).json({
        success: {
            message: "product found",
            product: product
        }
    });
});

// @route POST /products/:listId
// @desc Create a product and add to a list
// @access Private
exports.createProduct = expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const listId = req.params.listId;
    const productDetails = req.body.productDetails;

    if (!user) {
        res.status(401).send("Unathenticated");
        throw new Error("Not authorized");
    }

    const product = await Product.create(productDetails);

    await List.findOneAndUpdate({ _id: listId }, { $push: { products: product } });

    res.status(200).json({
        success: {
            message: "product created"
        }
    });
});

// @route DELETE /products/:listId/:productId
// @desc Delete product from list and db
// @access Private
exports.deleteProductFromList = expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const listId = req.params.listId;
    const productId = req.params.productId;

    if (!user) {
        res.status(401).send("Unathenticated");
        throw new Error("Not authorized");
    }

    // remove product from list
    const list = await List.findOne({ _id: listId });
    const a = list.products.pull({ _id: productId });
    list.save();

    // delete product
    const deleteInfo = await Product.deleteOne({ _id: productId });

    let message = '';
    if (deleteInfo.deletedCount > 0) {
        message = 'product deleted'
    } else {
        message = 'product not found'
    }
    res.status(200).json({
        success: {
            message: message
        }
    });
});

// @route DELETE /products/:listId
// @desc Update product in a list
// @access Private
exports.updateProduct = expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const listId = req.params.listId;
    const newProductData = req.body.product;

    if (!user) {
        res.status(401).send("Unathenticated");
        throw new Error("Not authorized");
    }

    await Product.updateOne({ _id: newProductData._id }, newProductData);

    res.status(200).json({
        success: {
            message: "product updated"
        }
    });
});