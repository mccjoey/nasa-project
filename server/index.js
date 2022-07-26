const http = require("http");
require('dotenv').config();
const app = require("./app");
const { loadPlanetsData } = require("./src/models/planets.model");
const { loadLaunchData } = require("./src/models/launches.model");
const { mongoConnect } = require("./src/services/mongo");
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();
  await loadLaunchData();

  server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
  });
}

startServer();
