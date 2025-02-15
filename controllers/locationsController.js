const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../assets/data/states_districts.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

exports.getStates = (req, res, next) => {
  try {
    const states = data[0].states.map(state => state.state);
    res.send(states);
  } catch (error) {
    next(error);
  }
};

exports.getDistricts = (req, res, next) => {
  try {
    const stateName = req.params.state;
    const state = data[0].states.find(state => state.state === stateName);
    if (state) {
      res.send(state.districts);
    } else {
      res.status(404).send({ message: 'State not found' });
    }
  } catch (error) {
    next(error);
  }
};