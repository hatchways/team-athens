const expressAsyncHandler = require("express-async-handler");
const List = require("../models/List");
const crudServices = require('../services/Crud');
const _ = require('lodash');
const Product = require("../models/Product");


const auth = async (_id) => {
    const user = await crudServices.getOne(User, { _id })
    if (!user) {
        res.status(401).send("Unauthenticated");
        throw new Error("Not authorized");
    }
    return user

}


exports.getAll = expressAsyncHandler(async (req, res, next) => {
    await auth(req.user.id);

    const lists = await crudServices.getList(List, { userId: req.user.id });
    res.send({ data: lists });

});

exports.get = expressAsyncHandler(async (req, res, next) => {
    await auth(req.user.id);

    const id = req.params.listId;
    console.log(id)
    if (!id) {
        res.status(404).send("NotFound");
    }

    const lists = await crudServices.getList(List, { userId: req.user.id, _id: id });

    // if You want to handle this condition
    // if (_.isEmpty(lists))
    //     return res.send({ data: [] });
    res.send({ data: lists });

});

exports.create = expressAsyncHandler(async (req, res, next) => {
    await auth(req.user.id);

    await crudServices.add(List, { name: req.body.name, userId: req.user.id });
    res.status(200).send({
        message: 'Successfully added'
    });
});

exports.update = expressAsyncHandler(async (req, res, next) => {
    await auth(req.user.id);
    await crudServices.updateOne(List, { _id: req.body.id }, { name: req.body.name });
    res.status(200).send({
        message: 'Successfully updated'
    })

});

exports.deleteItem = expressAsyncHandler(async (req, res, next) => {
    await auth(req.user.id);
    const lists = await crudServices.getOne(List, { _id: req.body.id }, { products: 1 });
    if (!_.isEmpty(lists))
        await crudServices.removeAll(Product, { _id: { $in: lists } });

    await crudServices.remove(List, { _id: req.body.id })
    res.status(200).send({
        message: 'Successfully deleted'
    })
});