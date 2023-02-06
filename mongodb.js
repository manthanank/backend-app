const mongoose = require('mongoose');

require("dotenv").config();

mongoose
  .connect(
    "mongodb+srv://manthanank:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0.re3ha3x.mongodb.net/backend"
  )
  .then(() => {
    console.log("Connected to MongoDB database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

module.exports = mongoose;