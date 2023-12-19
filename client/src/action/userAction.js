import axios from "axios";
import { Toast_Container, notify_success } from "./../toast";
import { message } from "antd";

export const handleGetAllUsers = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      "http://127.0.0.1:8000/users/admin",
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error.message);
    throw error;
  }
};

export const handleGetUserByID = async (user_id) => {
  try {
    const user = await axios.get(
      `http://127.0.0.1:8000/users/getUser/${user_id}`,
    );


    if (user.data.success) {
      return user.data.user;
    }
  } catch (error) {
    console.error("Error fetching user:", error.message);
    throw error;
  }
};

export const handleGetRecipesUser = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const recipes = await axios.get(
      "http://127.0.0.1:8000/users/recipeManager",
      config
    );

    if (recipes.data.success) {
      return recipes.data.recipes;
    }
  } catch (error) {
    console.error("Error fetching all users:", error.message);
    throw error;
  }
};

export const handleDeleteRecipes = async (recipe_id) => {
  try {
    // Get the authentication token from localStorage or wherever you store it
    const token = localStorage.getItem("accessToken");

    // Gọi API để cập nhật trạng thái "ban" của người dùng
    const response = await axios.post(
      "http://127.0.0.1:8000/users/deleteRecipe",
      {
        recipe_id: recipe_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Xử lý phản hồi từ server
    console.log(response.data);
    if (response.data.success) {
      message.success("Recipe deleted successfully");
      // Cập nhật trạng thái của người dùng trong state hoặc component
    } else {
      console.error("Error deleting user:", response.data.message);
    }
  } catch (error) {
    console.error("Error deleting user:", error.message);
  }
};

export const updateUserProfile = async (updatedProfile, userId) => {
  try {
    // Get the authentication token from localStorage or wherever you store it
    const token = localStorage.getItem("accessToken");
    // Make an API request to update the user profile with token in headers
    const response = await axios.put(
      `http://127.0.0.1:8000/users/updateProfile/${userId}`,
      updatedProfile,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Updated User in action:', response);

    // Assuming the API response contains the updated user profile
    const updatedUserProfile = response.data;

    return updatedUserProfile;
  } catch (error) {
    console.error("Error updating user profile:", error.message);
    throw error;
  }
};

