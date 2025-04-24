const fs = require('fs');
const path = require('path');

exports.getStates = async (req, res, next) => {
  try {
    const dataPath = path.join(
      __dirname,
      '../assets/data/states_districts.json',
    );
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const states = data[0].states.map((state) => state.state);
    res.send(states);
  } catch (error) {
    next(error);
  }
};
