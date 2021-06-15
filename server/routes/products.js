const express = require('express');
const router = express.Router();
const { get, getAll, create, deleteItem, update } = require('../controllers/product')
const protect = require('../middleware/auth');

//:id will be list id each product is attached with a list

//create
router.route('/:listId').post(protect, (req, res) => create(req, res));

//update
router.route('/:listId').put(protect, (req, res) => update(req, res));

//delete
router.route('/:listId').delete(protect, (req, res) => deleteItem(req, res));

//get all
router.route('/:listId').get(protect, (req, res) => getAll(req, res));

//get by id
router.route('/:listId/:productId').get(protect, (req, res) => get(req, res));

module.exports = router;
