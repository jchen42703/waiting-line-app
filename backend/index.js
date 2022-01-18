const express = require("express");
const app = express();

app.use(express.json());

// starter (temp endpoint)
app.post("/", (req, res) => {
  res.send({ payload: "test!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
