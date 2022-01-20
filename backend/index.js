const express = require("express");
const cors = require("cors");

if (process.env.NODE_ENV === "production") {
  envConfig = { path: ".env.production" };
} else {
  envConfig = { path: ".env.dev" };
}

require("dotenv").config(envConfig);

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", require("./controllers"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
