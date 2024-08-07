const Users = require('../models/users.js');

//get all users
exports.getUsers = async (req, res, next) => {
    try {
        const data = await Users.find({});
        res.send(data);
    } catch (error) {
        next(error);
    }
};

//get user by id
exports.getUserById = async (req, res, next) => {
    try {
        const data = await Users.findOne({ _id: req.params.id });
        res.send(data);
    }
    catch (error) {
        next(error);
    }
};

//post user
exports.postUser = async (req, res, next) => {
    const { name, age } = req.body;
    try {
        const data = await Users.create({ name, age });
        res.send(data);
    }
    catch (error) {
        next(error);
    }
};

//put user
exports.putUser = async (req, res, next) => {
    try {
        const data = await Users.findByIdAndUpdate({ _id: req.params.id }, req.body);
        res.send(data);
    }
    catch (error) {
        next(error);
    }
};

//delete user
exports.deleteUser = async (req, res, next) => {
    try {
        const data = await Users.findByIdAndRemove({ _id: req.params.id });
        res.send(data);
    }
    catch (error) {
        next(error);
    }
};
