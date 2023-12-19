require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const Ingredient = require("../model/ingredientModel");

// @route GET API
const getAllIngredients = async (req, res) => {
    try {
        // Fetch all ingredients
        const ingredients = await Ingredient.find({});
        res.json({ success: true, ingredients });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = { getAllIngredients };
