import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import starIcon from "/src/assets/star.png";
import filterIcon from "/src/assets/filter.png";
import commentIcon from "/src/assets/chat.png";
import likeIcon from "/src/assets/heart.png";
import { handleRankingRecipes } from "../../action/recipesAction";

let recipes_db = [];

// eslint-disable-next-line react/prop-types
const RecipeRanking = ({ recipes: initialRecipes = recipes_db }) => {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [sortOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("rating");

  const convertCookTimeToMinutes = (cookTime) => {
    let hoursMatch = cookTime.match(/(\d+)\s*hrs/);
    let minutesMatch = cookTime.match(/(\d+)\s*mins/);

    let hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
    let minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

    return hours * 60 + minutes;
  };

  const handleSortByRating = () => {
    setSortBy("rating");
    let sortedRecipes = [...recipes].sort((a, b) => b.rating - a.rating);
    setRecipes(sortedRecipes);
  };

  const handleSortByCookTime = () => {
    setSortBy("cookTime");
    let sortRecipes = [...recipes].sort(
      (a, b) =>
        convertCookTimeToMinutes(a.cook_time) -
        convertCookTimeToMinutes(b.cook_time)
    );
    setRecipes(sortRecipes);
  };

  useEffect(() => {
    const fetchRankingRecipes = async () => {
      recipes_db = await handleRankingRecipes();

      if (recipes_db) {
        let list_recipes = recipes_db.slice(0, 10);
        setRecipes(list_recipes);
      }
    };
    fetchRankingRecipes();
  }, [sortOrder]);

  return (
    <div className="recipe-ranking-container container border-t mx-auto px-4 py-7">
      <div className="flex justify-between items-center mb-4 space-x-4">
        <h2 className="text-2xl font-bold mb-2">Top Recipes</h2>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-3">
            <img src={filterIcon} alt="filter" className="h-8 w-8 mr-2" />
            <button
              className={`bg-green-500 text-white px-4 py-2 rounded-md ${
                sortBy === "rating" ? "opacity-75" : ""
              }`}
              onClick={handleSortByRating}
            >
              Rating
            </button>
            <button
              className={`bg-green-500 text-white px-4 py-2 rounded-md ${
                sortBy === "cookTime" ? "opacity-75" : ""
              }`}
              onClick={handleSortByCookTime}
            >
              Time
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
        {recipes && recipes.map((recipe, index) => (
          <Link to={`/recipes/?ID=${recipe?.recipe_id}`} key={recipe.recipe_id}>
            <div
              key={index}
              className="bg-white rounded-lg shadow overflow-hidden transform transition duration-500 hover:scale-105 h-full"
            >
              <img
                src={recipe?.img_src}
                alt={recipe?.recipe_name}
                className="w-full h-44 object-cover rounded-t-lg"
              />
              <div className="p-4 flex flex-col h-full">
                <h3 className="font-bold text-lg overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {recipe?.recipe_name}
                </h3>
                <p className="text-gray-700 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {recipe?.cook_time}
                </p>
                <div className="flex flex-row items-center justify-between mt-2">
                  <div className="flex items-center">
                    {/* Like Icon */}
                    <div className="flex items-center mr-2">
                      <img src={likeIcon} alt="like" className="h-5 w-5" />
                    </div>

                    {/* Comment Icon */}
                    <div className="flex items-center">
                      <img
                        src={commentIcon}
                        alt="comment"
                        className="h-5 w-5 mr-2"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    {/* Star (Rating) Icon */}
                    <div className="flex items-center">
                      <img src={starIcon} alt="Star" className="h-5 w-5 mr-2" />
                      <span className="font-bold">{recipe?.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecipeRanking;
