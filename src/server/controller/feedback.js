require("dotenv").config();
const express = require("express");
const sendFeedback = require("../utils/sendFeedback");

const createFeedbackControl = async (req, res) => {
  const feedback = req.body;
  try {
    const emailSubject = "New Feedback Received";
    const emailBody = `
      <h1>New Feedback about: ${feedback.title}</h1>
      <p>Name: ${feedback.name}</p>
      <p>Address: ${feedback.address}</p>
      <p>Phone number: ${feedback.phoneNumber}</p>
      <p>Email: ${feedback.email}</p>
      <p>Feedback: ${feedback.feedback}</p>
      <p>Satisfaction: ${feedback.satisfaction}</p>
    `;

    const emailSent = await sendFeedback(process.env.USER, emailSubject, emailBody);

    if (!emailSent) {
        return res.status(500).json({
            success: false,
            message: "Error sending feedback mail",
        });
    }
        return res.status(200).send({
        success: true,
        message: "Feedback submitted successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
module.exports = {
    createFeedbackControl,
};
