const Logs = require('../models/logs.js');

exports.postLogs = async (req, res, next) => {
    try {
        const log = new Logs(req.body);
        await log.save();
        res.status(201).send(log);
      } catch (error) {
        res.status(400).send(error);
      }
};

exports.getLogs = async (req, res, next) => {
    try {
        const logs = await Logs.find({});
        res.send(logs);
    } catch (error) {
        res.status(500).send(error);
    }
}