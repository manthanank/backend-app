const fs = require('fs');
const path = require('path');

exports.getUses = (req, res, next) => {
  const filePath = path.join(__dirname, '../assets/data/uses.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return next(err);
    }

    try {
      const uses = JSON.parse(data);
      res.status(200).json(uses);
    } catch (parseError) {
      next(parseError);
    }
  });
};
