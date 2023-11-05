require('dotenv').config();
const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");

const accountModel = require("../model/accountModel");
const verifyToken = require("../middleware/account");
const User = require("../model/userModel");

const verificationCodes = {};

const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: '1nguyenan19072003@gmail.com', 
    pass: 'ufns qanp qyvb fdhe', 
  },
});

router.post("/login", async(req, res) => {
    const {email, password } = req.body;
  
    try {
      await accountModel.findOne({email:email}).then((result) => {
        if (!result) {
         
          console.log("Username does not exist!");
          res.json({ success: false, error: "Username does not exist!" });
          
        } else {
  
          if (result.password === password && result.password) {
            console.log("Success");
            
            const accessToken = jwt.sign({userid:result._id},process.env.ACCESS_TOKEN_SECRET);

            res.status(200).json({ success: true, message:"Login Success",accessToken});
            
          } else {
            console.log("Fail");
            res.status(404)
            .json({ success: false, error: "Incorrect password!" });
          }
        }
      });

    } catch (error) {

      console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error'});
      
    }
    
  });
  
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    const result = await accountModel.findOne({ email: email });
  
    if (result) {
      res
        .status(409)
        .json({ success: false, error: "Username already exists!" });
    } else {
      console.log("Success");
      
      const maxUserId = await accountModel.estimatedDocumentCount()
      const account = new accountModel({
        user_id: maxUserId + 1,
        email: email,
        password: password,
      });
  
      account.save().then(() => {
        const accessToken = jwt.sign({userid:account._id},process.env.ACCESS_TOKEN_SECRET);
        res.json({ success: true, message: "Register Success",accessToken});
      });
    }
  });

router.post('/sendVerificationCode', async (req, res) => {
    const userEmail = await accountModel.findOne({ email: req.body.email });
    if (userEmail) {
      // Tạo một mã xác thực ngẫu nhiên
      const verificationCode = Math.floor(100000 + Math.random() * 900000);
      verificationCodes[userEmail.email] = verificationCode
      // nội dung Email
      const mailOptions = {
        from: '1nguyenan19072003@gmail.com',
        to: userEmail.email,
        subject: 'Mã xác thực',
        text: `Mã xác thực cho tài khoản LoveCook của bạn là: ${verificationCode}`,
      };
      // Gửi email
      console.log(transporter, mailOptions)
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(500).json({ success: false, message: 'Gửi mã xác thực thất bại' });
        } else {
          res.status(200).json({ success: true, message: 'Gửi mã xác thực thành công' });
        }
      });
    } else {
      res.status(404).json({ success: false, message: 'Email không tồn tại' });
    }
  });
router.post('/changePassword',async (req, res) => {
  const email = req.body.email;
  const verificationCode = req.body.verificationCode;
  const newPassword = req.body.newPassword;
  // console.log(verificationCodes[email], verificationCode)
  // Kiểm tra mã xác thực
  if (verificationCodes[email] && verificationCodes[email] == verificationCode) {
    const userEmail = await accountModel.findOne({ email: req.body.email });
    userEmail.password = newPassword
    await userEmail.save() 
    res.status(200).json({ success: true, message: 'Thay đổi mật khẩu thành công' });
  } else {
    res.status(400).json({ success: false, message: 'Mã xác thực không hợp lệ' });
  }
});
  module.exports = router;