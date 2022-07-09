const mongoose = require("mongoose");

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

const MONGO_URL =
  "mongodb+srv://nasa-api:sUs6YmJYnKNR1PvN@nasacluster.m3pzi.mongodb.net/?retryWrites=true&w=majority";

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}
async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = { mongoConnect, mongoDisconnect };
