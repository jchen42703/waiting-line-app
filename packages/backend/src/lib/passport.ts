import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { Strategy as FacebookStrategy } from "passport-facebook";
import { randomUUID } from "crypto";
import { getAdminByEmail, addAdmin } from "./models/admin/admin";
import passport from "passport";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

enum SOURCE_TYPE {
  GOOGLE = "google",
  FACEBOOK = "facebook",
}

export function setupPassport() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        // parse profile
        const email = profile.emails[0].value;
        const givenName = profile.name.givenName;
        const familyName = profile.name.familyName;
        const provider = profile.provider;

        const currentAdmin = await getAdminByEmail({ email });

        // if doesnt exist add to database
        if (!currentAdmin) {
          const newAdmin = await addAdmin({
            id: randomUUID(),
            email,
            firstName: givenName,
            lastName: familyName,
            source: provider,
          });
          return done(null, newAdmin);
        }

        // needs to be from google
        if (currentAdmin.source != SOURCE_TYPE.GOOGLE) {
          //return error
          return done(null, false, {
            message: `You have previously signed up with a different signin method`,
          });
        }

        currentAdmin.lastVisited = new Date();
        return done(null, currentAdmin);
      },
    ),
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "/api/auth/facebook/callback",
        profileFields: ["email", "name"],
      },
      async function (accessToken, refreshToken, profile, done) {
        // parse profile
        const email = profile.emails[0].value;
        const givenName = profile._json.first_name;
        const familyName = profile._json.last_name;

        const provider = "facebook";

        const currentAdmin = await getAdminByEmail({ email });

        // if doesnt exist add to database
        if (!currentAdmin) {
          const newAdmin = await addAdmin({
            id: randomUUID(),
            email,
            firstName: givenName,
            lastName: familyName,
            source: provider,
          });
          return done(null, newAdmin);
        }

        // needs to be from facebook
        if (currentAdmin.source != SOURCE_TYPE.FACEBOOK) {
          //return error
          return done(null, false, {
            message: `You have previously signed up with a different signin method`,
          });
        }
        currentAdmin.lastVisited = new Date();
        return done(null, currentAdmin);
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}
