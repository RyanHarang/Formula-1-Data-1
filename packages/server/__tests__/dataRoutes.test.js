const request = require("supertest");
const express = require("express");
const dataRoutes = require("../../server/routes/dataRoutes");

const app = express();
app.use(express.json());
app.use("/api/data", dataRoutes);

const api = request(app);

describe("Data Routes API", () => {
  it("should fetch all drivers", async () => {
    const response = await api.get("/api/data/drivers");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should fetch active drivers for 2024", async () => {
    const response = await api.get("/api/data/drivers-active");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach((driver) => {
      expect(driver.lastYear).toBe(2024);
    });
  });

  it("should fetch a single driver by ID", async () => {
    const response = await api
      .get("/api/data/driver-single")
      .send({ id: "some-driver-id" }); // Replace with a valid ID for testing
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", "some-driver-id");
  });

  it("should fetch all teams", async () => {
    const response = await api.get("/api/data/teams");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should fetch a single team by ID", async () => {
    const response = await api
      .get("/api/data/team-single")
      .send({ id: "some-team-id" }); // Replace with a valid ID for testing
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", "some-team-id");
  });

  it("should fetch all races", async () => {
    const response = await api.get("/api/data/races");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should fetch active races for 2024", async () => {
    const response = await api.get("/api/data/races-active");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach((race) => {
      expect(race.date).toMatch(/2024/);
    });
  });

  it("should fetch a single race by ID", async () => {
    const response = await api
      .get("/api/data/race-single")
      .send({ id: "some-race-id" }); // Replace with a valid ID for testing
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", "some-race-id");
  });

  it("should fetch laps for a specific driver and race", async () => {
    const response = await api
      .get("/api/data/race-laps")
      .send({ driverId: "some-driver-id", raceId: "some-race-id" }); // Replace with valid IDs for testing
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach((lap) => {
      expect(lap.driverId).toBe("some-driver-id");
      expect(lap.raceId).toBe("some-race-id");
    });
  });
});