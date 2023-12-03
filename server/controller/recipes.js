require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const Recipe = require("../model/recipeModel");
const User = require("../model/userModel");
const Ingredient = require("../model/ingredientModel");

// @route GET API
const getRankingRecipesControl = async (req, res) => {
  try {
    const ranking_recipes = await Recipe.find({})
      .sort({ rating: -1 })
      .limit(20);
    res.json({ success: true, ranking_recipes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getRecommendedRecipesControl = async (req, res) => {
  try {
    const users = await User.find({ favourites: { $type: "array" } });

    const favourites = users.map((user) => user.favourites);
    const favourites_list = [].concat(...favourites);
    const favourites_set = new Set(favourites_list);
    const favourites_list_unique = [...favourites_set];

    const recommended_recipes = await Recipe.find({recipe_id: {$in: favourites_list_unique}})
      .sort({ rating: -1 })
      .limit(15);
    res.json({ success: true, recommended_recipes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getRecipesByKeywords = async (req, res) => {
  try {
    const keywords  = req.query.keywords.replace(/"/g, '');
    
    const keywordsArray = keywords.split(',');

    const ingredients = await Ingredient.find({
      name: { $in: keywordsArray }
    }).select('id');

    const ingredientIds = ingredients.map(ingredient => ingredient.id);
    
    // Tạo điều kiện tìm kiếm
    const searchCondition = {
      $or: keywordsArray.map(keyword => ({
        $or: [
          { recipe_name: { $regex: keyword, $options: 'i' } },
          {nutrition: { $regex: keyword, $options: 'i' }},
          {tagname : { $regex: keyword, $options: 'i' }},
          {ingredients: { $elemMatch: { $in: ingredientIds } }},
        ]
      }))
    };


    // Tìm kiếm các công thức dựa trên từ khóa
    const recipes = await Recipe.find(searchCondition)
      .sort({ rating: -1 })
      .limit(30);
    
    
    res.json({ success: true, recipes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getRecipesByID = async (req, res) => {
  try {
    const id = parseInt(req.query.ID);

    // Tìm kiếm công thức dựa trên id
    const recipe = await Recipe.findOne({"recipe_id":id});
    
    if (!recipe) {
      return res.status(404).json({ success: false, message: "Recipe not found" });
    }

    res.json({ success: true, recipe });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { getRecommendedRecipesControl, getRankingRecipesControl,getRecipesByKeywords,getRecipesByID};
