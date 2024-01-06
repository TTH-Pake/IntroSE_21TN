require("dotenv").config();
const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const feedbackController = require("../controller/feedback");


router.post("/", feedbackController.createFeedbackControl);

module.exports = router;