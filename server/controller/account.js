require("dotenv").config();
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const Account = require("../model/accountModel");
const verifyToken = require("../middleware/account");
const sendverificationLink = require("../utils/sendMail");
const User = require("../model/userModel");
const Token = require("../model/tokenModel");
const crypto = require("crypto");

const verificationCodes = {};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "1nguyenan19072003@gmail.com",
    pass: "ufns qanp qyvb fdhe",
  },
});

const loginControl = async (req, res) => {
  const { email, password } = req.body;

  await Account.findOne({ email: email })
    .then((result) => {
      if (!result) {
        res.json({ success: false, error: "Username does not exist!" });
      } else {
        if (result.password === password && result.password) {
          if (!result.is_verified) {
            return res.status(401).json({
              success: false,
              message: "Account not verified",
            });
          }
          const accessToken = jwt.sign(
            { userid: result._id },
            process.env.ACCESS_TOKEN_SECRET
          );
          res
            .status(200)
            .json({ success: true, message: "Login Success", accessToken });
        } else {
          res
            .status(404)
            .json({ success: false, error: "Incorrect password!" });
        }
      }
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    });
};

const registerControl = async (req, res) => {
  const { name, email, password } = req.body;
  await Account.findOne({ email: email })
    .then(async (result) => {
      if (result) {
        res
          .status(409)
          .json({ success: false, error: "Username already exists!" });
      } else {
        const maxUserId = await Account.estimatedDocumentCount();
        const account = new Account({
          user_id: maxUserId + 1,
          email: email,
          password: password,
        });

        const user = new User({
          user_id: account.user_id,
          name: name,
          account: account._id,
        });

        await user.save();

        account.save().then(() => {
          const accessToken = jwt.sign(
            { userid: account.user_id },
            process.env.ACCESS_TOKEN_SECRET
          );

          res.json({ success: true, message: "Register Success", accessToken });
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    });
};

const registerWithVerificationControl = async (req, res) => {
  const { name, email, password } = req.body;
  await Account.findOne({ email: email })
    .then(async (result) => {
      if (result) {
        res
          .status(409)
          .json({ success: false, error: "Username already exists!" });
      } else {
        const maxUserId = await Account.estimatedDocumentCount();
        const account = new Account({
          user_id: maxUserId + 1,
          email: email,
          password: password,
        });

        const user = new User({
          user_id: account.user_id,
          name: name,
          account: account._id,
        });

        const token = new Token({
          email: email,
          token: crypto.randomBytes(16).toString("hex"),
        });

        await token.save();
        console.log("account mail: ", token.email, " token: ", token.token);

        // WARNING: This is not a good way to generate a verification code.
        // This is the verification code.
        // const verificationCode = Math.floor(100000 + Math.random() * 900000);
        let link = "http://localhost:3000/account/verify/" + token.token;
        let isSentSuccessfully = await sendverificationLink(
          email,
          "Verify your account",
          link
        );
        if (!isSentSuccessfully) {
          return res.status(500).json({
            success: false,
            message: "Error sending verification code",
          });
        }
        return res.status(200).send({
          success: true,
          message: "A verification code has been sent to " + email + ".",
        });

        // await user.save();

        // account.save().then(() => {
        //   const accessToken = jwt.sign(
        //     { userid: account.user_id },
        //     process.env.ACCESS_TOKEN_SECRET
        //   );

        //   res.json({ success: true, message: "Register Success", accessToken });
        // });
      }
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    });
};

const confirmEmailControl = async (req, res) => {
  try {
    const token = await Token.findOne({ token: req.params.token });
    console.log("confirm token: ", token);
    await Account.findOne({ email: token.email })
      .then(async (result) => {
        if (!result) {
          res.status(400).json({
            success: false,
            message: "We were unable to find a account for this token.",
          });
        } else {
          await Account.findOneAndUpdate({ is_verified: true });
          res.status(200).json({
            success: true,
            message: "The account has been verified. Please log in.",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const sendVerificationCodeControl = async (req, res) => {
  const userEmail = await Account.findOne({ email: req.body.email });
  if (userEmail) {
    // Tạo một mã xác thực ngẫu nhiên
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    verificationCodes[userEmail.email] = verificationCode;
    // nội dung Email
    const mailOptions = {
      from: "1nguyenan19072003@gmail.com",
      to: userEmail.email,
      subject: "Mã xác thực",
      text: `Mã xác thực cho tài khoản LoveCook của bạn là: ${verificationCode}`,
    };
    // Gửi email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res
          .status(500)
          .json({ success: false, message: "Gửi mã xác thực thất bại" });
      } else {
        res
          .status(200)
          .json({ success: true, message: "Gửi mã xác thực thành công" });
      }
    });
  } else {
    res.status(404).json({ success: false, message: "Email không tồn tại" });
  }
};

const changePasswordControl = async (req, res) => {
  const email = req.body.email;
  const verificationCode = req.body.verificationCode;
  const newPassword = req.body.newPassword;
  // Kiểm tra mã xác thực
  if (
    verificationCodes[email] &&
    verificationCodes[email] == verificationCode
  ) {
    const userEmail = await Account.findOne({ email: req.body.email });
    userEmail.password = newPassword;
    await userEmail.save();
    res
      .status(200)
      .json({ success: true, message: "Thay đổi mật khẩu thành công" });
  } else {
    res
      .status(400)
      .json({ success: false, message: "Mã xác thực không hợp lệ" });
  }
};

const resetPasswordControl = async (req, res) => {
  const { email, password } = req.body;

  let result = await Account.findOne({ email: email });

  if (!result) {
    res.status(400).json({ success: false, error: "Email does not exists!" });
  } else {
    try {
      result.password = password;
      result = await Account.findOneAndUpdate({ email: email }, result, {
        new: true,
      });
      if (!result) {
        return res.status(401).json({
          success: false,
          message: "Account not found or user not authorised",
        });
      }

      const accessToken = jwt.sign(
        { userid: result._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.status(200).json({
        success: true,
        message: "Reset password successfully",
        accessToken,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
};

const loginWithGoogleControl = async (req, res) => {
  const { name, email, password } = req.body;
  await Account.findOne({ email: email })
    .then(async (result) => {
      if (result) {
        res
          .status(409)
          .json({ success: false, error: "Username already exists!" });
      } else {
        const maxUserId = await Account.estimatedDocumentCount();
        const account = new Account({
          user_id: maxUserId + 1,
          email: email,
          password: password,
        });

        const user = new User({
          user_id: account.user_id,
          name: name,
          account: account._id,
        });

        await user.save();

        account.save().then(() => {
          const accessToken = jwt.sign(
            { userid: account.user_id },
            process.env.ACCESS_TOKEN_SECRET
          );

          res.json({ success: true, message: "Register Success", accessToken });
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    });
};

module.exports = {
  loginControl,
  registerControl,
  registerWithVerificationControl,
  confirmEmailControl,
  sendVerificationCodeControl,
  changePasswordControl,
  resetPasswordControl,
  loginWithGoogleControl,
};
