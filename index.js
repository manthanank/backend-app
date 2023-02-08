const express = require("express");
// const mongoose = require("mongoose");
const mongoose = require('./mongodb.js');
const PORT = process.env.PORT || 3000;
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
// const mysql = require('mysql2')
const cloudinary = require('cloudinary').v2;
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// const connection = mysql.createConnection(process.env.DATABASE_URL);

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

// const serviceAccount = require("./serviceAccountKey.json");
// const admin = require('firebase-admin');

require("dotenv").config();

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.json());

// mongoose
//   .connect(
//     "mongodb+srv://manthanank:" +
//       process.env.MONGO_ATLAS_PW +
//       "@cluster0.re3ha3x.mongodb.net/backend"
//   )
//   .then(() => {
//     console.log("Connected to database!");
//   })
//   .catch(() => {
//     console.log("Connection failed!");
//   });

app.use("/api", require("./routes/data"));
app.use("/api", require("./routes/image"));
app.use("/api", require("./routes/users"));
app.use("/api", require("./routes/states"));
app.use("/api", require("./routes/districts"));
app.use("/api", require("./routes/simpleapis"));
app.use("/api", require("./routes/blogs"));
app.use("/api", require("./routes/projects"));
// app.use(function (err, req, res, next) {
//   res.status(422).send({ error: err.message });
// });

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello: () => {
    return 'Hello world!';
  },
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

// console.log('Connected to PlanetScale!')
// connection.end()

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} and GraphQL server listening on port ${PORT}/graphql`);
});
