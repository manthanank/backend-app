const fs = require('fs');
const path = require('path');

exports.getDistricts = async (req, res, next) => {
  try {
    const dataPath = path.join(__dirname, '../assets/data/states_districts.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const districts = data[0].states.flatMap(state => state.districts);
    res.send(districts);
  } catch (error) {
    next(error);
  }
};