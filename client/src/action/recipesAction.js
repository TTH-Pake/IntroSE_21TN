import axios from "axios";
import { message } from "antd";
// import { Cookies } from "js-cookie";

// Get recomended recipes
export const handleRecommendedRecipes = async () => {
  try {
    const result = await axios.get("http://127.0.0.1:8000/home");

    if (result.data.success === true) {
      return result.data.recommended_recipes;
    } else {
      message.error(result.data.error);
    }
  } catch (err) {
    console.log(err);
  }
  return false;
};

export const handleRankingRecipes = async () => {
  try {
    const result = await axios.get("http://127.0.0.1:8000/home");
    if (result.data.success === true) {
      return result.data.ranking_recipes;
    } else {
      message.error(result.data.error);
    }
  } catch (err) {
    console.log(err);
  }
  return false;
};

export const handleSearchRecipes = async (keywords) => {
  try {
    const result = await axios.get(
      `http://127.0.0.1:8000/search/?keywords=${encodeURIComponent(keywords)}`
    );
    if (result.data.success === true) {
      return result.data.recipes;
    } else {
      message.error(result.data.error);
    }
  } catch (err) {
    console.log(err);
  }
  return false;
};

export const handleSearchRecipesID = async (ID) => {
  try {
    const result = await axios.get(`http://127.0.0.1:8000/recipes/?ID=${ID}`);
    if (result.data.success === true) {
      return result.data.recipe;
    } else {
      message.error(result.data.error);
    }
  } catch (err) {
    console.log(err);
  }
  return false;
};

export const handleCreateRecipe = async (recipe) => {
  // const accessToken = Cookies.get("accessToken");
  const accessToken = localStorage.getItem("accessToken");
  try {
    const result = await axios.post(
      "http://127.0.0.1:8000/recipe/create",
      { recipe: recipe }, // This is the data you're sending
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    if (result.data.success === true) {
     
      message.success("Create successfully!");
      return true;
    } else {
      
      message.error(result.data.message);
    }
  } catch (err) {
    console.log(err);
  }
  return false;
};

export const handleGetCommentsByRecipeId = async (recipeId) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/recipes/${recipeId}/comment`
    );

    if (response.data.success) {
      return { success: true, comments: response.data.comments };
    } else {
      console.error("Server returned error:", response.data.message);
      message.error(response.data.message);
      return { success: false, message: response.data.message };
    }
  } catch (err) {
    console.error("Failed to make the request:", err.message);
    message.error("Failed to get comments");
    return { success: false, message: "Failed to get comments" };
  }
};

export const handleGetRelatedRecipes = async (recipeId) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/recipes/${recipeId}/related`
    );

    if (response.data.success) {
      return { success: true, relatedRecipes: response.data.relatedRecipes };
    } else {
      console.error("Server returned error:", response.data.message);
      // Thực hiện xử lý lỗi nếu cần
      return { success: false, message: response.data.message };
    }
  } catch (err) {
    console.error("Failed to make the request:", err.message);
    // Thực hiện xử lý lỗi nếu cần
    return { success: false, message: "Failed to get related recipes" };
  }
};
