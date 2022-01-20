const express = require("express");
const { auth } = require('express-openid-connect');
const router = express.Router();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUER
  };

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

module.exports = router;

