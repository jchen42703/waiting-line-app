import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { Strategy as FacebookStrategy } from "passport-facebook";
import { randomUUID } from "crypto";
import passport from "passport";
import { getAdminByEmail, addAdmin } from "./models/admin";

const { GOOGLE_CLIENT_ID } = process.env;
const { GOOGLE_CLIENT_SECRET } = process.env;

const { FACEBOOK_APP_ID } = process.env;
const { FACEBOOK_APP_SECRET } = process.env;

enum SourceType {
  GOOGLE = "google",
  FACEBOOK = "facebook",
}

async function googleAuthCallback(accessToken, refreshToken, profile, done) {
  // parse profile
  const email = profile.emails[0].value;
  const { givenName, familyName } = profile.name;
  const { provider } = profile;

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
  if (currentAdmin.source !== SourceType.GOOGLE) {
    // return error
    return done(null, false, {
      message: `You have previously signed up with a different signin method`,
    });
  }

  currentAdmin.lastVisited = new Date();
  return done(null, currentAdmin);
}

export function setupPassport() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
      },
      googleAuthCallback,
    ),
  );

  async function facebookAuthCallback(
    accessToken,
    refreshToken,
    profile,
    done,
  ) {
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
    if (currentAdmin.source !== SourceType.FACEBOOK) {
      // return error
      return done(null, false, {
        message: `You have previously signed up with a different signin method`,
      });
    }
    currentAdmin.lastVisited = new Date();
    return done(null, currentAdmin);
  }

  passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "/api/auth/facebook/callback",
        profileFields: ["email", "name"],
      },
      facebookAuthCallback,
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}
