const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const User = require("../../model/userModel");

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
        const user = await User.findOne({ google_id: profile.id });
        if (user) {
          return done(null, user);
        }
        const maxUserId = await User.estimatedDocumentCount();
        const newUser = new User({
          user_id: maxUserId + 1,
          google_id: profile.id,
          name: profile.displayName,
          avatar: profile.photos[0].value,
          profile_image : "https://e7.pngegg.com/pngimages/358/473/png-clipart-computer-icons-user-profile-person-child-heroes.png",
          gender: "other",
          is_admin: false,
        });

        await newUser.save();
        return done(null, newUser);
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
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
