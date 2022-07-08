const launchesDataBase = require("./launches.mongo");
const planets = require('./planets.mongo');

const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

async function getAllLaunches() {
  return await launchesDataBase.find({}, "-_id -__v")
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName : launch.target
  });

  console.log(planet)

  if(!planet) {
    throw new Error('No planet found');
  }

  try {
    await launchesDataBase.updateOne(
      {
        flightNumber: launch.flightNumber,
      },
      launch,
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.log(error)
  }
  
}

function addNewLaunch(launch) {
  saveLaunch(launch);
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      flightNumber: latestFlightNumber,
      customers: ["Zero to Mastery", "NASA"],
    })
  );
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  getAllLaunches,
  abortLaunchById,
  addNewLaunch,
  existsLaunchWithId,
};
