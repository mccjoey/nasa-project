const request = require("supertest");
const app = require("../../app");
const { loadPlanetsData } = require("../../models/planets.model");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
    await loadPlanetsData()
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test GET /launches", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .get("/v1/launches")
        .expect(200)
        .expect("Content-type", /json/);
    });
  });

  describe("Test POST /launch", () => {
    const completeLaunchData = {
      mission: "ZTM155",
      rocket: "ZTM Experimental IS1",
      launchDate: "January 17, 2030",
      target: "Kepler-1652 b",
    };

    const launchDataWithoutDate = {
      mission: "ZTM155",
      rocket: "ZTM Experimental IS1",
      target: "Kepler-1652 b",
    };

    const launchDataWithInvalidDate = {
      mission: "ZTM155",
      rocket: "ZTM Experimental IS1",
      launchDate: "ajshf",
      target: "Kepler-1652 b",
    };

    test("It should respond with 201 created", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(completeLaunchData)
        .expect(201)
        .expect("Content-type", /json/);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();

      expect(responseDate).toBe(requestDate);

      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test("It should catch missing required properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithoutDate)
        .expect(400)
        .expect("Content-type", /json/);
      expect(response.body).toStrictEqual({
        error: "Mission required launch property",
      });
    });

    test("It should catch invalid dates", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithInvalidDate)
        .expect(400)
        .expect("Content-type", /json/);

      expect(response.body).toStrictEqual({
        error: "Invalid Launch date",
      });
    });
  });
});
