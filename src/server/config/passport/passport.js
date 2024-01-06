const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const User = require("../../model/userModel");
const Account = require("../../model/accountModel");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const account = await Account.findOne({ google_id: profile.id });
        if (account) {
          const user = await User.findOne({ account: account._id });
          return done(null, user);
        }
        console.log("profile: ", profile);
        const maxUserId = await Account.estimatedDocumentCount();
        console.log("maxUserId: ", maxUserId);
        const newAccount = new Account({
          user_id: maxUserId + 1,
          email: profile.emails[0].value,
          google_id: profile.id,
        });

        const user = new User({
          user_id: maxUserId + 1,
          name: profile.displayName,
          profile_image: profile.photos[0].value,
          is_admin: false,
          account: newAccount._id,
        });

        await user.save();
        await newAccount.save();
        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error, null);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: process.env.SERVER_URL + "auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const account = await Account.findOne({
          facebook_id: profile.id,
        });
        if (account) {
          const user = await User.findOne({ account: account._id });
          return cb(null, user);
        }
        console.log("profile: ", profile);
        console.log("profile.picture: ", profile._json.picture);
        const maxUserId = await Account.estimatedDocumentCount();
        const newAccount = new Account({
          user_id: maxUserId + 1,
          email: `facebookaccount${maxUserId + 1}@gmail.com`,
          facebook_id: profile.id,
        });

        const user = new User({
          user_id: maxUserId + 1,
          name: profile.displayName,
          is_admin: false,
          account: newAccount._id,
        });

        await user.save();
        await newAccount.save();
        return cb(null, user);
      } catch (error) {
        console.log(error);
        return cb(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
