const mongoose = require("mongoose")

const DriverSchema = new mongoose.Schema({
    id:Number,
    name: String,
    image: String,
    DOB: String,
    lastYear: Number,
    team: Number,
    totalRaces: String,
    wins: String
},
{
    collection:"Racer_Info"
})

const TeamSchema = new mongoose.Schema({
    id: Number,
    name: String,
    nationality: String,
    image: String,
    wins: String,
    races: String,
    drivers: [Number]
},
{
    collection:"Teams"
})

const RaceSchema = new mongoose.Schema({
    id: Number,
    title: String,
    date: String,
    trace: String,
    winner: Number,
    fastestLap: String,
    polePosition: Number
},
{
    collection:"RaceData"
})

const LapSchema = new mongoose.Schema({
    raceId: Number,
    driverId: Number,
    lapNumber: Number,
    time: String,
    position: String
},
{
    collection:"LapData"
})

module.exports = {DriverSchema, TeamSchema, RaceSchema, LapSchema}