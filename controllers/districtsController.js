const District = require("../models/districts");

exports.getDistricts = (req, res, next) => {
  District.find({})
    .then((districts) => {
      res.send(districts);
    })
    .catch(next);
};

exports.createDistrict = (req, res, next) => {
  District.create(req.body)
    .then((district) => {
      res.send(district);
    })
    .catch(next);
};

exports.updateDistrict = (req, res, next) => {
  District.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      District.findOne({ _id: req.params.id }).then((district) => {
        res.send(district);
      });
    })
    .catch(next);
};

exports.deleteDistrict = (req, res, next) => {
  District.findOneAndDelete({ _id: req.params.id })
    .then((district) => {
      res.send(district);
    })
    .catch(next);
};