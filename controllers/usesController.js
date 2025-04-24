const fs = require('fs');
const path = require('path');

exports.getUses = (req, res) => {
  const filePath = path.join(__dirname, '../assets/data/uses.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: 'Error reading uses data', error: err });
    }

    try {
      const uses = JSON.parse(data);
      res.status(200).json(uses);
    } catch (parseError) {
      res
        .status(500)
        .json({ message: 'Error parsing uses data', error: parseError });
    }
  });
};
