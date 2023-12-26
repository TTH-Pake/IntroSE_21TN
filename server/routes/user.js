require("dotenv").config();
const express = require("express");
const router = express.Router();
const accountModel = require("../model/accountModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const User = require("../model/userModel");
const userController = require("../controller/user");
const verifyToken = require("../middleware/account");

router.get("/admin", verifyToken, userController.getAllUsersControl);

// @route GET API
// @desc GET user
// @access private
router.get("/", verifyToken, userController.getAccountControl);

// @route POST API/POST
// @desc Create user
// @access private
router.post("/", verifyToken, userController.createUserControl);

// @route GET API/GET
// @desc Get profile
// @access private

router.get("/profile", verifyToken, userController.getProfileControl);

router.get("/favourites", verifyToken, userController.getFavouriteRecipesControl);
router.post("/favourites", verifyToken, userController.addFavouriteControl);

// router.put("/edit", verifyToken, userController.editProfileUserControl);

// @route POST API/changepassword
// @desc Change user password
// @access private
router.post(
  "/admin/changepassword",
  verifyToken,
  userController.changePassword
);

// @route POST API/deleteUser
// @desc Delete User
// @access private
router.post("/admin/deleteUser", verifyToken, userController.deleteUser);

router.get(
  "/recipe-manager",
  verifyToken,
  userController.getRecipeManagerControl
);

router.get("/blogManager", verifyToken, userController.getBlogManagerControl);

router.get(`/getUser/:user_id`, userController.getUserByUserIdControl);

router.post("/deleteRecipe", verifyToken, userController.deleteRecipeControl);

// @route PUT API/updateProfile
// @desc Update User
// @access private
router.put("/updateProfile/:userId", userController.updateProfile);

router.put(`/edit-recipe/:recipeId`,verifyToken,userController.editRecipeControl);

module.exports = router;
