const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
// set up our express app
const app = express();

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
require("dotenv").config();
// connect to mongodb
//mongoose.connect("mongodb://localhost:27017");
mongoose
  .connect(
    "mongodb+srv://manthanank:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0.re3ha3x.mongodb.net/backend"
    // "mongodb+srv://max:QuBqs0T45GDKPlIG@cluster0-ntrwp.mongodb.net/node-angular?retryWrites=true"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.use(express.json());
// initialize routes

app.use("/api", require("./routes/api"));
app.use("/api", require("./routes/states_api"));
app.use("/api", require("./routes/districts_api"));

// error handling middleware
app.use(function (err, req, res, next) {
  //console.log(err);
  res.status(422).send({ error: err.message });
});

// listen for requests
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
