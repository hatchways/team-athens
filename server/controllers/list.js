const expressAsyncHandler = require("express-async-handler");
const List = require("../models/List");

const projection = {
    name: 1,
    products: 1,
};

exports.getAllLists = expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401).send("Unathenticated");
        throw new Error("Not authorized");
    }

    try {
        const lists = await List.find({ userId: [user._id] }, projection);
        res.status(200).json({
            success: true,
            lists: lists
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            msg: 'server error',
        });
    }


});

exports.getById = expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const listId = req.params.listId;

    if (!user) {
        res.status(401).send("Unathenticated");
        throw new Error("Not authorized");
    }

    try {
        //find list that belongs to this user
        const list = await List.findOne({ _id: listId, userId: [user._id] }, projection);
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


    } catch (err) {
        res.status(400).json({
            success: false,
            msg: 'server error',
            error: err
        });
    }
});

exports.createList = expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const listName = req.body.listName;

    if (!user) {
        res.status(401).send("Unathenticated");
        throw new Error("Not authorized");
    }

    try {
        // check if the list already exists
        const list = await List.findOne({ userId: [user._id], name: listName });
        if (list) {
            return res.status(200).json({
                success: false,
                msg: 'List already exists'
            });
        }

        // create list
        const newList = await List.create({ name: req.body.listName, userId: [user._id] });

        res.status(200).json({
            success: true,
            msg: 'List created',
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            msg: 'server error',
        });
    }
});

exports.updateList = expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const listData = req.body.listData;

    if (!user) {
        res.status(401).send("Unathenticated");
        throw new Error("Not authorized");
    }

    try {
        const list = await List.findOneAndUpdate({ _id: listData._id }, listData);

        res.status(200).json({
            success: true,
            msg: 'list updated'
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            msg: 'server error',
        });
    }
});

exports.deleteList = expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const listId = req.params.listId;

    if (!user) {
        res.status(401).send("Unathenticated");
        throw new Error("Not authorized");
    }

    try {
        const list = await List.findOne({ _id: listId, userId: [user._id] });
        if (!list) {
            return res.status(400).json({
                success: false,
                msg: 'list not found or not owned by current user'
            });
        }

        await List.deleteOne({ _id: listId });

        res.status(200).json({
            success: {
                success: true,
                msg: 'list removed'
            }
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            msg: 'server error',
        });
    }


});