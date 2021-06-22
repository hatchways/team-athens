const expressAsyncHandler = require("express-async-handler");
const List = require("../models/List");

const projection = {
    name: 1,
    products: 1,
    creator: 1,
    imageUrl: 1,
};

exports.getAllLists = expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401).send("Unathenticated");
        throw new Error("Not authorized");
    }

    const lists = await List.find({ creator: user._id }, projection);
    res.status(200).json({
        success: true,
        lists: lists
    });
});

exports.getById = expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const listId = req.params.listId;

    if (!user) {
        res.status(401).send("Unathenticated");
        throw new Error("Not authorized");
    }

    //find list that belongs to this user
    const list = await List.findOne({ _id: listId, creator: user._id }, projection);
    if (!list) {
        return res.status(200).json({
            success: false,
            msg: 'cannot find list'
        });
    }

    res.status(200).json({
        success: true,
        list: list
    });
});

exports.createList = expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const listName = req.body.listName;
    const imageUrl = req.body.imageUrl;

    if (!user) {
        res.status(401).send("Unathenticated");
        throw new Error("Not authorized");
    }

    // check if the list already exists
    const list = await List.findOne({ creator: user._id, name: listName });
    if (list) {
        return res.status(200).json({
            success: false,
            msg: 'List already exists'
        });
    }

    // create list
    await List.create({ name: req.body.listName, creator: user._id, imageUrl: imageUrl });

    res.status(200).json({
        success: true,
        msg: 'List created',
    });
});

exports.updateList = expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const listData = req.body.listData;

    if (!user) {
        res.status(401).send("Unathenticated");
        throw new Error("Not authorized");
    }

    await List.findOneAndUpdate({ _id: listData._id }, listData);

    res.status(200).json({
        success: true,
        msg: 'list updated'
    });
});

exports.deleteList = expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const listId = req.params.listId;

    if (!user) {
        res.status(401).send("Unathenticated");
        throw new Error("Not authorized");
    }

    const list = await List.findOne({ _id: listId, creator: user._id });
    if (!list) {
        return res.status(400).json({
            success: false,
            msg: 'list not found or not owned by current user'
        });
    }

    //delete
    await List.deleteOne({ _id: listId });

    res.status(200).json({
        success: {
            success: true,
            msg: 'list removed'
        }
    });
});