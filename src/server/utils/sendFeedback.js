require("dotenv").config();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const sendFeedback = async (email, subject, email_body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: subject,
      html: email_body,
    });
    console.log("email sent successfully");
    return true;
  } catch (error) {
    console.log("email not sent!");
    console.log("user: ", process.env.USER);
    console.log("pass: ", process.env.PASS);
    console.log(error);
    return false;
  }
};

module.exports = sendFeedback;
