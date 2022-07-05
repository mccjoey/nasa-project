const express = require("express");
const path = require("path");
const cors = require("cors");
const planetsRouter = require("./routes/planets/planets.router");

const app = express();
const whitelist = ["http://localhost:3000"];

function corsOptionsDelegate(req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
}

app.use(cors(corsOptionsDelegate));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

//ROUTES
app.use(planetsRouter);

module.exports = app;
