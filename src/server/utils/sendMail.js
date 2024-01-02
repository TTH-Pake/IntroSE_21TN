require("dotenv").config();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const sendMail = async (email, subject, code) => {
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
      // html: `
      // <div>
      // <h1>Verify your account</h1>
      // <p>Click this <a href="${link}">link</a> to verify your account</p>
      // <p> Or copy this link to your browser</p>
      // <p>${link}</p>
      // <p>This link will expire in 10 minutes</p>
      // <p>Thanks</p>
      // <p>Love Cook</p>
      // </div>
      // `,
      html: `
      <div>
      <h1>${subject}</h1>
      <p>Your verification code is: <strong>${code}</strong></p>
      <p>This code will expire in 10 minutes</p>
      <p>Thanks</p>
      <p>Love Cook</p>
      </div>
      `,
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
