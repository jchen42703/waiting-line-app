const express = require("express");
const router = express.Router();

router.use("/queue", require("./queue.js"));
router.use("/auth",require("./auth.js"))

// temp endpoint
router.get("/", (req, res) => {
  res.send({ payload: "test!" });
});

module.exports = router;
