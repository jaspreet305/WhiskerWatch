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
app.use("/users", require("./src/controllers/users"));
app.use("/workers", require("./src/controllers/workers"));
app.use("/pets", require("./src/controllers/pets"));
module.exports = app;
