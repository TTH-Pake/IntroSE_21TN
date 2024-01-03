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
        
        const maxUserId = await Account.estimatedDocumentCount();
       
        const newAccount = new Account({
          user_id: maxUserId + 1,
          email: profile.emails[0].value,
          google_id: profile.id,
          name: profile.displayName,
          avatar: profile.photos[0].value,
          profile_image : "https://e7.pngegg.com/pngimages/358/473/png-clipart-computer-icons-user-profile-person-child-heroes.png",
          gender: "other",
          is_admin: false,
        });

        const user = new User({
          user_id: maxUserId + 1,
          name: profile.displayName,
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
