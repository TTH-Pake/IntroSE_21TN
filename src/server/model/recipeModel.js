const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  recipe_id: {
    type: Number,
    required: true,
    unique: true,
  },
  recipe_name: {
    type: String,
    required: true,
  },
  tagname: String,
  prep_time: String,
  cook_time: String,
  directions: String,
  rating: {
    type: Number,
    default: 0,
  },
  url: String,
  cuisine_path: String,
  nutrition: String,
  img_src: String,
  user_contribution: String,
  tags: [String], // Một mảng các chuỗi
  nutritions: [String], // Một mảng các chuỗi
  author : Number,
  ingredients_list: [String],
  ingredients: [Number],
  created_time: Date,
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
