const express = require('express');
const router = express.Router();
const { getProductById, getAllProducts, createProduct, deleteProductFromList, updateProduct } = require('../controllers/product');
const protect = require('../middleware/auth');

router.route('/:listId').post(protect, createProduct);
router.route('/:listId').put(protect, updateProduct);
router.route('/:listId/:productId').delete(protect, deleteProductFromList);
router.route('/:listId').get(protect, getAllProducts);
router.route('/:listId/:productId').get(protect, getProductById);

module.exports = router;