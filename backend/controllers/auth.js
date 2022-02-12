const express = require("express");
// const { auth } = require('express-openid-connect');
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oidc");
const AdminService = require("../lib/admin/admin");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      callbackURL: "/api/auth/oauth2/redirect/google",
      scope: ["profile", "email"],
    },
    // cb: Resolves/rejects the promise
    async function (
      issuer,
      { id, name: { familyName, givenName }, emails },
      done
    ) {
      const email = emails[0].value;
      const profilePhoto = "";
      console.log(issuer);
      // console.log(profile);
      const currentAdmin = await AdminService.getAdminByEmail({ email });
      if (!currentAdmin) {
        const newAdmin = await AdminService.addGoogleAdmin({
          id,
          email,
          givenName,
          familyName,
          profilePhoto,
          issuer,
        });
        return done(null, newAdmin);
      }

      if (currentAdmin.source != issuer) {
        //return error
        return done(null, false, {
          message: `You have previously signed up with a different signin method`,
        });
      }

      currentAdmin.lastVisited = new Date();
      return done(null, currentAdmin);
    }
  )
);

// const config = {
//     authRequired: false,
//     auth0Logout: true,
//     secret: process.env.SECRET,
//     baseURL: process.env.BASEURL,
//     clientID: process.env.CLIENTID,
//     issuerBaseURL: process.env.ISSUER
//   };

// // auth router attaches /login, /logout, and /callback routes to the baseURL
// router.use(auth(config));

router.get("/login", function (req, res, next) {
  res.render(`${__dirname}/views/login.ejs`);
});

router.get("/login/federated/google", passport.authenticate("google"));

router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/api/auth/login",
  })
);

module.exports = router;
