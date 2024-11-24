const Data = require("../models/data");

exports.getData = async function (req, res, next) {
  try {
    const data = await Data.find({});
    res.send(data);
  } catch (error) {
    next(error);
  }
};

exports.createData = async function (req, res, next) {
  try {
    const data = await Data.create(req.body);
    res.send(data);
  } catch (error) {
    next(error);
  }
};

exports.updateData = async function (req, res, next) {
  try {
    await Data.findOneAndUpdate({ _id: req.params.id }, req.body);
    const updatedData = await Data.findOne({ _id: req.params.id });
    res.send(updatedData);
  } catch (error) {
    next(error);
  }
};

exports.deleteData = async function (req, res, next) {
  try {
    const data = await Data.findOneAndDelete({ _id: req.params.id });
    res.send(data);
  } catch (error) {
    next(error);
  }
};