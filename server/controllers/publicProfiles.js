const asyncHandler = require("express-async-handler");
const List = require("../models/List");
const Product = require("../models/Product");

exports.getPublicLists = asyncHandler(async (req, res, next) => {
  const lists = await List.find({ isPrivate: false }).select([
    "-creator",
    "-userIds",
  ]);
  res.status(200).json({
    success: true,
    lists: lists,
  });
});

exports.getListProducts = asyncHandler(async (req, res, next) => {
  const listId = req.params.listId;

  if (!listId) {
    res.status(400).json({
      error: { message: "listId unspecified" },
    });
    return;
  }

  try {
    const list = await List.findById(listId);

    if(!list) {
      res.status(404).json({
        error: { message: "Not Found" },
      });
      return;
    }
  
    if(list.isPrivate == true) {
      res.status(401).json({
        error: { message: "unauthorized" },
      });
      return;
    }
  
    const products = await Product.find().where('_id').in(list.products);
  
    res.status(200).json({
      success: {
        message: "Found",
        products: products,
      },
    });

  } catch (error) { // Cast to ObjectId failed for @param<listId>
    res.status(500).json({
      error: { message: `${istId} cannot be casted to ObjectId` },
    });
    return;
  }
});
