require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const Recipe = require("../model/recipeModel");
const User = require("../model/userModel");
const Ingredient = require("../model/ingredientModel");
const Comment = require("../model/commentModel");

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

    const recommended_recipes = await Recipe.find({
      recipe_id: { $in: favourites_list_unique },
    })
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
    const keywords = req.query.keywords.replace(/"/g, "");

    const keywordsArray = keywords
      .split(",")
      .map((keyword) => keyword.trim().toLowerCase());
    const ingredients = await Ingredient.find({
      name: { $in: keywordsArray },
    }).select("id");

    const ingredientIds = ingredients.map((ingredient) => ingredient.id);

    // Tạo điều kiện tìm kiếm
    const searchCondition = {
      $or: keywordsArray.map((keyword) => ({
        $or: [
          { recipe_name: { $regex: keyword, $options: "i" } },
          { nutrition: { $regex: keyword, $options: "i" } },
          { tagname: { $regex: keyword, $options: "i" } },
          { ingredients: { $elemMatch: { $in: ingredientIds } } },
        ],
      })),
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
    const recipe = await Recipe.findOne({ recipe_id: id });

    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    res.json({ success: true, recipe });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const postRecipeControl = async (req, res) => {
  try {
    const recipe = req.body.recipe;
    const {
      recipe_name,
      nutrition,
      ingredients_list,
      tagname,
      rating,
      img_src,
      cook_time,
      prep_time,
      ingredients,
    } = recipe;

    const user = await User.findOne({ account: req.userid }).populate(
      "account",
      ["email"]
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const maxRecipeId = await Recipe.estimatedDocumentCount();
    const recipe_id = maxRecipeId + 1;

    console.log(recipe_id);

    const newRecipe = new Recipe({
      recipe_id: recipe_id,
      recipe_name: recipe_name,
      nutrition: nutrition,
      ingredients_list: ingredients_list,
      ingredients: ingredients,
      tagname: tagname,
      cook_time: cook_time,
      prep_time: prep_time,
      rating: rating,
      author: user.user_id,
      img_src: img_src,
      created_time: new Date(),
    });

    await newRecipe.save();

    user.user_recipes.push(recipe_id);

    await user.save();

    res.json({
      success: true,
      message: "Recipe created successfully",
      recipe_id: recipe_id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const getCommentsByRecipeId = async (req, res) => {
  try {
    const recipeId = req.params.id;

    const comments = await Comment.find({ recipe_id: recipeId }).limit(5);

    res.json({ success: true, comments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getRelatedRecipes = async (req, res) => {
  try {
    const id = req.params.id;

    // Tìm kiếm công thức dựa trên id
    const recipe = await Recipe.findOne({ recipe_id: id });

    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    // Lấy các tag của công thức đang xem
    const tags = recipe.tags || [];

    // Tìm kiếm các công thức có ít nhất một tag giống với công thức đang xem
    const relatedRecipes = await Recipe.find({
      tags: { $in: tags }, // Tìm các công thức có ít nhất một tag giống với tags của công thức đang xem
      recipe_id: { $ne: id }, // Loại bỏ công thức đang xem khỏi kết quả
    }).limit(5); // Giới hạn số lượng công thức trả về

    res.json({ success: true, relatedRecipes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  getRecommendedRecipesControl,
  getRankingRecipesControl,
  getRecipesByKeywords,
  getRecipesByID,
  postRecipeControl,
  getCommentsByRecipeId,
  getRelatedRecipes,
};
