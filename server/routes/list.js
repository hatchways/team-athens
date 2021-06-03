const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');

//create
router.route('/').post(protect, (req,res)=>{res.send()});

//update
router.route('/').put(protect, (req,res)=>{res.send()});

//delete
router.route('/').delete(protect, (req,res)=>{res.send()});

//get all
router.route('/').get(protect,(req,res)=>{res.send()});

//get by id
router.route('/:listId(\\d+)').get(protect,(req,res)=>{res.send()});

module.exports = router;