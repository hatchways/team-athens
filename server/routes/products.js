const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const controller = require('../controllers/product')

//:id will be list id each product is attached with a list

//create
router.route('/:listId').post(protect, (req, res) => controller.create(req, res));

//update
router.route('/:listId').put(protect, (req, res) => controller.update(req, res));

//delete
router.route('/:listId').delete(protect, (req, res) => controller.delete(req, res));

//get all
router.route('/:listId').get(protect, (req, res) => controller.get(req, res));

//get by id
router.route('/:listId/:productId').get(protect, (req, res) => controller.get(req, res));

module.exports = router;
