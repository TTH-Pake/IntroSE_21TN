require("dotenv").config();
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/account");

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const recipesController = require("../controller/recipes");

router.get("/home", recipesController.getRankingRecipesControl);
router.get("/home", recipesController.getRecommendedRecipesControl);
router.get("/search/", recipesController.getRecipesByKeywords);
router.get("/recipes/", recipesController.getRecipesByID);
router.get("/recipes/:id/comment", recipesController.getCommentsByRecipeId);
router.get("/recipes/:id/related", recipesController.getRelatedRecipes);

router.post("/recipe/create", verifyToken, recipesController.postRecipeControl);

module.exports = router;
