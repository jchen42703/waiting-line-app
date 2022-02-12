const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

if (process.env.NODE_ENV === "production") {
  envConfig = { path: ".env.production" };
} else {
  envConfig = { path: ".env.dev" };
}

require("dotenv").config(envConfig);
// initializes the db connection pool
require("./lib/db/mongodb")();

const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "adminSessions",
});

// Catch errors
store.on("error", function (error) {
  console.log(error);
});

app.use(
  require("express-session")({
    secret: "This is a secret",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: store,
    // Boilerplate options, see:
    // * https://www.npmjs.com/package/express-session#resave
    // * https://www.npmjs.com/package/express-session#saveuninitialized
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello " + JSON.stringify(req.session));
});

app.use("/api", require("./controllers"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
