const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');

//:id will be list id each product is attached with a list

//create
router.route('/:listId(\\d+)').post(protect, (req,res)=>{res.send()});

//update
router.route('/:listId(\\d+)').put(protect, (req,res)=>{res.send()});

//delete
router.route('/:listId(\\d+)').delete(protect, (req,res)=>{res.send()});

//get all
router.route('/:listId(\\d+)').get(protect,(req,res)=>{res.send()});

//get by id
router.route('/:listId(\\d+)/:productId(\\d+)').get(protect,(req,res)=>{res.send()});

module.exports = router;
