const Product = require("../models/Product");
const List = require("../models/List");
const expressAsyncHandler = require("express-async-handler");
const crudServices = require('../services/Crud');

const auth = async (_id) => {
    const user = await crudServices.getOne(User, { _id })
    if (!user) {
        res.status(401).send("Unauthenticated");
        throw new Error("Not authorized");
    }
    return user;

}


exports.getAll = expressAsyncHandler(async (req, res, next) => {
    await auth(req.user.id);
    const id = req.params.listId;
    const result = await crudServices.getList(Product, { userId: req.user.id });
    res.send({ data: result });

});


exports.get = expressAsyncHandler(async (req, res, next) => {
    await auth(req.user.id);

    const id = req.params.listId;
    console.log(id)
    if (!id) {
        res.status(404).send("NotFound");
    }

    const result = await crudServices.getList(Product, { userId: req.user.id, _id: id });

    // if You want to handle this condition
    // if (_.isEmpty(lists))
    //     return res.send({ data: [] });
    res.send({ data: result });

});

exports.create = expressAsyncHandler(async (req, res, next) => {
    await auth(req.user.id);

    const list = await crudServices.getOne(List, { userId: req.user.id, _id: req.body.id }, { _id: 1 });
    if (_.isNull(list))
        return res.send({ message: 'Invalid list id' });

    const product = await crudServices.add(Product, _.pick(req.body, ['name', 'description', 'url', 'pictureUrl', 'price']));

    await crudServices.updateOneWithDynamic(List, { _id: list._id }, { $push: { products: product._id } });
    return res.send({ message: 'Product created' })

});



exports.update = expressAsyncHandler(async (req, res, next) => {
    await auth(req.user.id);
    await crudServices.updateOne(Product, { _id: req.body.id }, { name: req.body.name });
    res.status(200).send({
        message: 'Successfully updated'
    })

});

exports.deleteItem = expressAsyncHandler(async (req, res, next) => {
    await auth(req.user.id);

    await crudServices.updateOneWithDynamic(List, { _id: req.body.list_id }, { $pull: { products: req.body.id } });
    await crudServices.remove(Product, { _id: req.body.id })

    res.status(200).send({
        message: 'Successfully deleted'
    })
});