const express = require("express");
const cors = require("cors");
const planetsRouter = require("./routes/planets/planets.router");

const app = express();
const whitelist = ["http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());

//ROUTES
app.use(planetsRouter);

module.exports = app;
