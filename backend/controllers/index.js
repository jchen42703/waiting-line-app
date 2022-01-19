const express = require("express");
const router = express.Router();

// router.use(require("./userRoot"));

// temp endpoint
router.get("/", (req, res) => {
  res.send({ payload: "test!" });
});

module.exports = router;
