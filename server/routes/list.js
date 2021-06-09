const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { get, getAll, create, deleteItem, update } = require('../controllers/list')

//create
router.route('/').post(protect, (req, res) => create(req, res));

//update
router.route('/').put(protect, (req, res) => update(req, res));

//delete
router.route('/').delete(protect, (req, res) => deleteItem(req, res));

//get all
router.route('/').get(protect, (req, res) => getAll(req, res));

//get by id
router.route('/:listId').get(protect, (req, res) => get(req, res));

module.exports = router;