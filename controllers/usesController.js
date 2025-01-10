const Uses = require('../models/uses');

exports.getAllUses = (req, res, next) => {
    Uses.find({})
        .then((data) => res.send(data))
        .catch(next);
};

exports.getUseById = (req, res, next) => {
    Uses.findOne({ _id: req.params.id })
        .then((data) => res.send(data))
        .catch(next);
};

exports.createUse = (req, res, next) => {
    Uses.create(req.body)
        .then((data) => res.send(data))
        .catch(next);
};

exports.updateUse = (req, res, next) => {
    Uses.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(() => Uses.findOne({ _id: req.params.id }))
        .then((data) => res.send(data))
        .catch(next);
};

exports.deleteUse = (req, res, next) => {
    Uses.findOneAndDelete({ _id: req.params.id })
        .then((data) => res.send(data))
        .catch(next);
};