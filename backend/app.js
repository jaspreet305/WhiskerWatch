const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", require("./src/controllers/user"));
app.use("/worker", require("./src/controllers/worker"));
app.use("/pet", require("./src/controllers/pet"));
app.use("/appointment", require("./src/controllers/appointment"));
module.exports = app;
