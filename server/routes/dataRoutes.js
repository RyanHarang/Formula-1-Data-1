const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const schemas = require("./schemas")

DriverModel = mongoose.model("DriverModel", schemas.DriverSchema)
TeamModel = mongoose.model("TeamModel", schemas.TeamSchema)
RaceModel = mongoose.model("RaceModel", schemas.RaceSchema)
LapModel = mongoose.model("LapModel", schemas.LapSchema)

router.get("/drivers", async (req, res) => {
  data =await DriverModel.find()
  res.json(data)
});

router.get("/driver-single", async (req, res) =>{
  const findID = req.body.id;
  console.log
  data =await DriverModel.findOne({id:findID});
  res.json(data)
})

router.get("/teams", async (req, res) => {
  data = await TeamModel.find()
  res.json(data)
});

router.get("/team-single", async(req, res) =>{
  const findID = req.body.id;
  data = await TeamModel.findOne({id:findID})
  res.json(data)
})

router.get("/races", async (req, res) => {
  data = await RaceModel.find()
  res.json(data)
});

router.get("/race-single", async(req, res) =>{
  const findID = req.body.id;
  data = await RaceModel.findOne({id:findID})
  res.json(data)
})

router.get("/race-laps", async(req, res)=>{
  const DriverID = req.body.driverId
  const RaceID = req.body.raceId
  data = await LapModel.find({raceId : RaceID, driverId: DriverID})
  res.json(data)
})

module.exports = router;