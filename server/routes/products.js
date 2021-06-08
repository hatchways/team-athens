const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');

//:id will be list id each product is attached with a list

//create
router.route('/:listId').post(protect, (req,res)=>{res.send()});

//update
router.route('/:listId').put(protect, (req,res)=>{res.send()});

//delete
router.route('/:listId').delete(protect, (req,res)=>{res.send()});

//get all
router.route('/:listId').get(protect,(req,res)=>{res.send()});

//get by id
router.route('/:listId/:productId').get(protect,(req,res)=>{res.send()});

module.exports = router;
