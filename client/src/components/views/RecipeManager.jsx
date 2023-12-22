import React, { useEffect, useState } from "react";
import NavBar from "../modules/Navbar";
import Footer from "../modules/Footer";
import deleteIcon from "../../assets/trash_can.svg";
import EditIcon from "../../assets/edit.png";
import starIcon from "../../assets/star.png";
import clockIcon from "../../assets/clock.png";
import Loading from "../modules/Loading";
import { useCookies } from "react-cookie";
import {
  handleGetRecipesUser,
  handleDeleteRecipes,
} from "../../action/userAction";
const Recipe = (recipe) => {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="bg-white rounded-lg shadow pl-10 h-64 grid grid-cols-4 w-2/3 items-center justify-center ">
        <div className="col-span-3 flex items-center ">
          <div className="w-2/3 overflow-hidden">
            <img
              className="object-cover h-48 w-full rounded"
              src={recipe.img_src}
              alt=""
            />
          </div>

          <div className="w-1/2 space-y-5">
            <h2 className="text-xl font-semibold mb-2 text-center">
              {recipe.recipe_name}
            </h2>

            <div className="w-1/2 pl-4 flex items-center">
              <p className="text-gray-500">Ratings: {recipe.rating}</p>
              <img className="w-4 h-4 ml-1 mb-0.5" src={starIcon} alt="" />
            </div>
            <div className="w-2/3 pl-4 flex items-center">
              <p className="text-gray-500">Cook time: {recipe.cook_time}</p>
              <img className="w-5 h-5 ml-1 " src={clockIcon} alt="" />
            </div>

            <h2 className="pl-4 text-gray-500">
              Create time: {recipe.created_time}
            </h2>
          </div>
        </div>

        <div className="col-span-1 flex items-center justify-center ml-10 space-x-5">
          <img className="h-10 w-10" src={EditIcon} alt="" />

          <button
            className="bg-white-300 hover:bg-yellow-300 text-white font-bold py-2 px-4 rounded"
            onClick={() =>
              handleDeleteRecipes(recipe.recipe_id, cookies.accessToken)
            }
          >
            <img className="h-10 w-10" src={deleteIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

const RecipeManager = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);

  useEffect(() => {
    setLoading(true);
    const fetchRecipes = async () => {
      const recipeUser = await handleGetRecipesUser(cookies.accessToken);
      setRecipes(recipeUser);
    };

    fetchRecipes();
    setLoading(false);
  }, [recipes]);

  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2">
        <Loading />;
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-red-100 ">
      <NavBar />
      <div className="container mx-auto">
        <h1 className="text-3xl text-center font-bold mb-4 mt-4">
          Recipe Manager
        </h1>
      </div>

      {recipes.map((recipe, index) => (
        <Recipe
          recipe_id={recipe.recipe_id}
          key={recipe.recipe_id}
          recipe_name={recipe.recipe_name}
          img_src={recipe.img_src}
          rating={recipe.rating}
          cook_time={recipe.cook_time}
          created_time={recipe.created_time}
        />
      ))}

      <div className="flex-grow"></div>
      <Footer className="justify-self-end" />
    </div>
  );
};

export default RecipeManager;
