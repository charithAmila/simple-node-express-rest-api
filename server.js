const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
var cors = require("cors");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to To DO Api."
  });
});

// listen for requests
require("./app/routes/task.routes.js")(app);

app.listen(3001, () => {
  console.log("Server is listening on port 3001");
});
