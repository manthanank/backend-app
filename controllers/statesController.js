const State = require('../models/states');
const District = require('../models/districts');

exports.getAllStates = (req, res, next) => {
    State.find({})
        .then((states) => {
            const stateKeys = states.map(state => state.key);
            District.find({ key: { $in: stateKeys } })
                .then((districts) => {
                    const statesWithDistricts = states.map(state => {
                        return {
                            ...state._doc,
                            districts: districts.find(d => d.key === state.key)?.districts || []
                        };
                    });
                    res.send(statesWithDistricts);
                });
        })
        .catch(next);
};

exports.createState = (req, res, next) => {
    State.create(req.body)
        .then((state) => res.send(state))
        .catch(next);
};

exports.updateState = (req, res, next) => {
    State.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(() => State.findOne({ _id: req.params.id }))
        .then((state) => res.send(state))
        .catch(next);
};

exports.deleteState = (req, res, next) => {
    State.findOneAndDelete({ _id: req.params.id })
        .then((state) => res.send(state))
        .catch(next);
};