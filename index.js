const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

require("dotenv").config();

const dbUser = process.env.MONGODB_USER;
const dbPassword = process.env.MONGODB_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.re3ha3x.mongodb.net/backend`
  )
  .then(() => {
    console.log("Connected to MongoDB database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.json());

// portfolio blogs
app.use("/api", require("./routes/blogs"));
// portfolio projects
app.use("/api", require("./routes/projects"));
// portfolio uses
app.use("/api", require("./routes/uses.js"));


app.use("/api", require("./routes/data"));
app.use("/api", require("./routes/users"));
app.use("/api", require("./routes/states"));
app.use("/api", require("./routes/districts"));
app.use("/api", require("./routes/simpleapis"));
app.use("/api", require("./routes/ossinsight"));
app.use("/api", require("./routes/contacts"));

app.use(function (err, req, res, next) {
  res.status(422).send({ error: err.message });
});

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
