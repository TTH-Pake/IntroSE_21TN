import axios from "axios";
import { Toast_Container, notify_success } from "./../toast";

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

   if(recipes.data.success)
   {  
      return recipes.data.recipes;
   }

  } catch (error) {
    console.error("Error fetching all users:", error.message);
    throw error;
  }
};

export const handleDeleteRecipes = async(recipe_id) => {

  try {
    // Get the authentication token from localStorage or wherever you store it
    const token = localStorage.getItem('accessToken');
    console.log("recipe_id ",recipe_id);

    // Gọi API để cập nhật trạng thái "ban" của người dùng
    const response = await axios.post(
        'http://127.0.0.1:8000/users/deleteRecipe',
        {
            recipe_id:recipe_id,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    // Xử lý phản hồi từ server
    if (response.data.success) {
        console.log(response.data);
        notify_success("User deleted successfully!");
        // Cập nhật trạng thái của người dùng trong state hoặc component
    } else {
        console.error('Error deleting user:', response.data.message);
    }
} catch (error) {
    console.error('Error deleting user:', error.message);
}

};

