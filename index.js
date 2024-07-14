const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path');

const otpRoutes = require('./routes/otp');

require("dotenv").config();

const dbUser = process.env.MONGODB_USER;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DBNAME || 'backend';

const mongoURI = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.re3ha3x.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB database!");
  })
  .catch((error) => {
    console.error("Connection failed:", error.message);
  });

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.json());

// routes
app.use("/api", require("./routes/blogs"));
app.use("/api", require("./routes/projects"));
app.use("/api", require("./routes/uses.js"));
app.use("/api", require("./routes/data"));
app.use("/api", require("./routes/users"));
app.use("/api", require("./routes/states"));
app.use("/api", require("./routes/districts"));
app.use("/api", require("./routes/simpleapis"));
app.use("/api", require("./routes/ossinsight"));
app.use("/api", require("./routes/contacts"));
app.use("/api", require("./routes/subscribers"));
app.use("/api", require("./routes/posts"));
app.use("/api", require("./routes/items"));
app.use("/api", require("./routes/books"));
app.use("/api", require("./routes/logs"));
app.use('/api', require('./routes/notes'));
app.use('/api', otpRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
