const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cloudinary = require('cloudinary').v2;
// const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { MongoClient } = require('mongodb');

require("dotenv").config();

const dbUser = process.env.MONGODB_USER;
const dbPassword = process.env.MONGODB_PASSWORD;

//method 1
// mongoose
//   .connect(
//     "mongodb+srv://manthanank" + ":" +
//     process.env.MONGO_ATLAS_PW +
//     "@cluster0.re3ha3x.mongodb.net/backend"

//       `mongodb+srv://${dbUser}:${dbPassword}@cluster0.re3ha3x.mongodb.net/backend`
//   )
//   .then(() => {
//     console.log("Connected to MongoDB database!");
//   })
//   .catch(() => {
//     console.log("Connection failed!");
//   });

//method2 (secured)
const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.re3ha3x.mongodb.net/backend`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connect = async () => {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
  } catch (err) {
    console.error(err);
  }
}
connect();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.json());

app.use("/api", require("./routes/data"));
app.use("/api", require("./routes/users"));
app.use("/api", require("./routes/states"));
app.use("/api", require("./routes/districts"));
app.use("/api", require("./routes/simpleapis"));
app.use("/api", require("./routes/ossinsight"));

app.use(function (err, req, res, next) {
  res.status(422).send({ error: err.message });
});

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
  console.log(`Server started on port ${PORT}`);
  console.log(`GraphQL server listening on port ${PORT}/graphql`);
});
