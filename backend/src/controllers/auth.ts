import { Request, Response, Router } from 'express';
import * as passport from 'passport';
import { GoogleStrategy } from 'passport-google-oidc';
import AdminService from '../lib/admin/admin';
const authRouter = Router();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env['GOOGLE_CLIENT_ID'],
      clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
      callbackURL: '/api/auth/oauth2/redirect/google',
      scope: ['profile', 'email'],
    },
    // cb: Resolves/rejects the promise
    async function (
      issuer,
      { id, name: { familyName, givenName }, emails },
      done,
    ) {
      const email = emails[0].value;
      const profilePhoto = '';
      console.log(issuer);
      // console.log(profile);
      const currentAdmin = await AdminService.getAdminByEmail({ email });
      if (!currentAdmin) {
        const newAdmin = await AdminService.addGoogleAdmin({
          id,
          email,
          firstName: givenName,
          lastName: familyName,
          profilePhoto,
          //   issuer,
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
    },
  ),
);

authRouter.get('/login', function (req: Request, res: Response) {
  console.log('req: ', req);
  res.render(`${__dirname}/views/login.ejs`);
});

authRouter.get('/login/federated/google', passport.authenticate('google'));

authRouter.get(
  '/oauth2/redirect/google',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/api/auth/login',
  }),
);

export default authRouter;
