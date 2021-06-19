const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { getById, getAllLists, createList, deleteList, updateList } = require('../controllers/list')

// @route POST /lists
// @desc Create a new list
// @access Private
router.route('/').post(protect, createList);

// @route PUT /lists
// @desc Update a list
// @access Private
router.route('/').put(protect, updateList);

// @route DELETE /lists/:listId
// @desc Delete a list using it's id
// @access Private
router.route('/:listId').delete(protect, deleteList);

// @route GET /lists
// @desc Get all lists for current user
// @access Private
router.route('/').get(protect, getAllLists);

// @route GET /lists/:listId
// @desc Get a list using it's
// @access Private
router.route('/:listId').get(protect, getById);

module.exports = router;