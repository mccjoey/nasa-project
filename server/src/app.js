const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const api = require("./routes/api");


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

app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

//ROUTES
app.use("/v1",api);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
