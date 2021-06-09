const expressAsyncHandler = require("express-async-handler");


exports.getAll = expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
  
    if (!user) {
      res.status(401).send("Unathenticated");
      throw new Error("Not authorized");
    }
    
    res.status(200).json({
      success: {
      }
    });
});

exports.get = expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401).send("Unathenticated");
        throw new Error("Not authorized");
    }

    res.status(200).json({
        success: {
        }
    });
});

exports.create = expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401).send("Unathenticated");
        throw new Error("Not authorized");
    }

    res.status(200).json({
        success: {
        }
    });
});

exports.update = expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401).send("Unathenticated");
        throw new Error("Not authorized");
    }

    res.status(200).json({
        success: {
        }
    });
});

exports.deleteItem = expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401).send("Unathenticated");
        throw new Error("Not authorized");
    }

    res.status(200).json({
        success: {
        }
    });
});