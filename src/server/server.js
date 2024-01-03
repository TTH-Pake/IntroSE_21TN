require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const session = require("express-session");
const passportSetup = require("./config/passport/passport.js");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const mongoose = require("mongoose");
const accountRouter = require("./routes/account");
const userRouter = require("./routes/user");
const recipesRouter = require("./routes/recipes");
const ingredientRouter = require("./routes/ingredient.js");
const commentRouter = require("./routes/comment.js");
const blogRouter = require("./routes/blog.js");
const oauthRouter = require("./routes/oauth.js");
// const authRouter = require("./routes/auth.js");

const chatbotRouter = require("./routes/chatbot.js");
const db = require("./db/index");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "your secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, domain: ".app.localhost" }, // set to true if your using https
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/blog", blogRouter);
app.use("/chatbot", chatbotRouter);
app.use("/account", accountRouter);
app.use("/", recipesRouter);
app.use("/users", userRouter);
app.use("/ingredients", ingredientRouter);
app.use("/comment", commentRouter);
app.use("/oauth", oauthRouter);
// app.use("/auth", authRouter);
db.on("error", (stream) => {
  console.log("mongodb error");
});

app.listen(8000, () => {
  console.log(`Node API app is running on port 8000`);
});
