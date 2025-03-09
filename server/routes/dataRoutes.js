const express = require("express");
const router = express.Router();

const Driver = require("../models/Driver");
const Race = require("../models/Race");
const Team = require("../models/Team");
const Lap = require("../models/Lap");

router.get("/drivers", async (req, res) => {
  data = await DriverModel.find();
  res.json(data);
});

router.get("/driver-single", async (req, res) => {
  const findID = req.body.id;
  console.log;
  data = await Driver.findOne({ id: findID });
  res.json(data);
});

router.get("/teams", async (req, res) => {
  data = await Team.find();
  res.json(data);
});

router.get("/team-single", async (req, res) => {
  const findID = req.body.id;
  data = await Team.findOne({ id: findID });
  res.json(data);
});

router.get("/races", async (req, res) => {
  data = await Race.find();
  res.json(data);
});

router.get("/race-single", async (req, res) => {
  const findID = req.body.id;
  data = await Race.findOne({ id: findID });
  res.json(data);
});

router.get("/race-laps", async (req, res) => {
  const DriverID = req.body.driverId;
  const RaceID = req.body.raceId;
  data = await Lap.find({ raceId: RaceID, driverId: DriverID });
  res.json(data);
});

module.exports = router;
