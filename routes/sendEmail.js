const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.send("email sent");
});

module.exports = router;
