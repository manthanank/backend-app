const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const helmet = require("helmet");
const logger = require("./logger");
const otpRoutes = require("./routes/otp");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
const dbUser = process.env.MONGODB_USER;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DBNAME || "backend";
const mongoURI = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.re3ha3x.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(mongoURI)
  .then(() => logger.info("Connected to MongoDB database!"))
  .catch((error) => logger.error("Connection failed:", error.message));

// Middleware
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.json());

// Routes
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
app.use("/api", require("./routes/notes"));
app.use("/api", otpRoutes);

// Swagger setup
require('./swagger')(app);

// Error handling
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Serve static files
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});