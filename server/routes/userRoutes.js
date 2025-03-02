const express = require("express");
const router = express.Router();

router.post("/preferences", (req, res) => {
  res.send("Update user preferences");
});

router.get("/preferences", (req, res) => {
  res.send("Fetch user preferences");
});

module.exports = router;
