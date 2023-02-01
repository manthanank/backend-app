const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);
require("dotenv").config();

mongoose
  .connect(
    "mongodb+srv://manthanank:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0.re3ha3x.mongodb.net/backend"
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

app.use("/api", require("./routes/data"));
app.use("/api", require("./routes/states"));
app.use("/api", require("./routes/districts"));
app.use("/api", require("./routes/simpleapi"));


app.use(function (err, req, res, next) {
  res.status(422).send({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
