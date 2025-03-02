const express = require("express");
const router = express.Router();

router.get("/drivers", (req, res) => {
  res.send("Get drivers data");
});

router.get("/teams", (req, res) => {
  res.send("Get teams data");
});

router.get("/races", (req, res) => {
  res.send("Get races data");
});

module.exports = router;
