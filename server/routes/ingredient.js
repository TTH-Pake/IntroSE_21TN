const express = require("express");
const router = express.Router();
const ingredientController = require("../controller/ingredient");

router.get("/", ingredientController.getAllIngredients);

module.exports = router;
