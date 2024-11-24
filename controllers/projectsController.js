const Projects = require("../models/projects");

exports.getAllProjects = (req, res, next) => {
  Projects.find({})
    .then((data) => res.send(data))
    .catch(next);
};

exports.getProjectById = (req, res, next) => {
  Projects.findOne({ _id: req.params.id })
    .then((data) => res.send(data))
    .catch(next);
};

exports.createProject = (req, res, next) => {
  Projects.create(req.body)
    .then((data) => res.send(data))
    .catch(next);
};

exports.updateProject = (req, res, next) => {
  Projects.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(() => Projects.findOne({ _id: req.params.id }))
    .then((data) => res.send(data))
    .catch(next);
};

exports.deleteProject = (req, res, next) => {
  Projects.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.send(data))
    .catch(next);
};
