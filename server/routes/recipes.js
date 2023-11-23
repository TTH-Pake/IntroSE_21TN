require("dotenv").config();
const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const recipesController = require("../controller/recipes");


router.get("/", recipesController.getRankingRecipesControl);
router.get("/home", recipesController.getRecommendedRecipesControl);

module.exports = router;