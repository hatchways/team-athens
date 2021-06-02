const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');

//:id will be list id each product is attached with a list

//create
router.route('/:id').post(protect, (req,res)=>{res.send()});

//update
router.route('/:id').put(protect, (req,res)=>{res.send()});

//delete
router.route('/:id').delete(protect, (req,res)=>{res.send()});

//get all
router.route('/:id').get(protect,(req,res)=>{res.send()});

//get by id
router.route('/:id/:id').get(protect,(req,res)=>{res.send()});

module.exports = router;
