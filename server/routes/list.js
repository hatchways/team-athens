const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const controller = require('../controllers/list')

//create
router.route('/').post(protect, (req, res) => controller.create(req, res));

//update
router.route('/').put(protect, (req, res) => controller.update(req, res));

//delete
router.route('/').delete(protect, (req, res) => controller.delete(req, res));

//get all
router.route('/').get(protect, (req, res) => controller.getAll(req, res));

//get by id
router.route('/:listId').get(protect, (req, res) => controller.get(req, res));

module.exports = router;