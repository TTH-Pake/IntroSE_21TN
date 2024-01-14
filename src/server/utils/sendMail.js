require("dotenv").config();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const verificationMailTemplate = (code) => {
  return `
  <div>
  <h1>Verify your account</h1>
  <p>Your verification code is: <strong>${code}</strong></p>
  <p>This code will expire in 10 minutes</p>
  <p>Thanks</p>
  <p>Love Cook</p>
  </div>
  `;
};

const resetPasswordMailTemplate = (code) => {
  return `
  <div>
  <h1>Reset your password</h1>
  <p>Your reset code is: <strong>${code}</strong></p>
  <p>This code will expire in 10 minutes</p>
  <p>Thanks</p>
  <p>Love Cook</p>
  </div>
  `;
};

const feedBackTemplate = (email_body) => {
  return `
  <div>
  <h1>Feedback</h1>
  <p>${email_body}</p>
  <p>Thanks</p>
  <p>Love Cook</p>
  </div>
  `;
};

const sendMail = async (email, mailType, content) => {
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

    let subject = "";
    let html = "";
    if (mailType === "verification") {
      subject = "Verify your account";
      html = verificationMailTemplate(content);
    } else if (mailType === "resetPassword") {
      subject = "Reset your password";
      html = resetPasswordMailTemplate(content);
    } else if (mailType === "feedback") {
      subject = "Feedback";
      html = feedBackTemplate(content);
    }

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: subject,
      html: html,
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

module.exports = sendMail;
