const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Account = require("../model/accountModel");

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000/";

router.get("/login/success", (req, res) => {
  console.log("req user: ", req.user);
  if (req.user) {
    const accessToken = jwt.sign(
      { userid: req.user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.status(200).json({
      success: true,
      message: "successful login with google",
      accessToken,
    });
    // res.redirect(CLIENT_URL);
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure login with google",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/auth/google/callback", function (req, res, next) {
  passport.authenticate("google", function (err, user, info) {
    if (err) {
      return res.redirect("/login/failed");
    }
    if (!user) {
      return res.redirect("/login/failed");
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }

      // const account = Account.findOne({ google_id: user.google_id });
      const accessToken = jwt.sign(
        { userid: user.account },
        process.env.ACCESS_TOKEN_SECRET
      );

      // res.status(200).json({
      //   success: true,
      //   message: "successful login with googleaaa",
      //   accessToken,
      // });

      return res.redirect(CLIENT_URL + "?token=" + accessToken);
    });
  })(req, res, next);
});

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed",
//   }),
//   (req, res) => {
//     res.status(200).json({
//       success: true,
//       message: "successful login with google",
//       user: req.user,
//     });
//   }
// );

// router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

// router.get(
//   "/github/callback",
//   passport.authenticate("github", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["profile"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
