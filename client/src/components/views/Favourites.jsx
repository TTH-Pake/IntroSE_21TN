import React, { useEffect, useState } from "react";
import NavBar from "../modules/Navbar";
import Footer from "../modules/Footer";
import Loading from "../modules/Loading";
import starIcon from "/src/assets/star.png";
import commentIcon from "/src/assets/chat.png";
import likeIcon from "/src/assets/heart.png";
import { useCookies } from "react-cookie";
import { handleGetFavouriteRecipesUser } from "../../action/userAction";
import { Link } from "react-router-dom";

const FavouriteRecipes = () => {
  const initialRecipesToShow = 4;
  const [recipesToShow, setRecipesToShow] = useState(initialRecipesToShow);
  const [favouriteRecipes, setFavouriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);

  useEffect(() => {
    setLoading(true);
    const fetchRecipes = async () => {
      const recipesFavourite = await handleGetFavouriteRecipesUser(
        cookies.accessToken
      );
      setFavouriteRecipes(recipesFavourite);
    };

    fetchRecipes();
    setLoading(false);
  }, [favouriteRecipes]);

  const handleLoadMore = () => {
    setRecipesToShow((prev) => Math.min(prev + 8, favouriteRecipes.length));
  };

  const handleShowLess = () => {
    setRecipesToShow(initialRecipesToShow);
  };

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
          Favourite Recipes
        </h1>
      </div>

      <div className="mx-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {favouriteRecipes &&
          favouriteRecipes.slice(0, recipesToShow).map((recipe, index) => (
            <Link
              to={`/recipes/?ID=${recipe.recipe_id}`}
              key={recipe.recipe_id}
            >
              <div
                key={index}
                className="bg-white rounded-lg shadow overflow-hidden transform transition duration-500 hover:scale-105 h-full"
              >
                <img
                  src={recipe.img_src}
                  alt={recipe.recipe_name}
                  className="w-full h-44 object-cover rounded-t-lg"
                />
                <div className="p-4 flex flex-col h-full">
                  <h3 className="font-bold text-lg overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {recipe.recipe_name}
                  </h3>
                  <p className="text-gray-700 overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {recipe.cook_time}
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
                        <img
                          src={starIcon}
                          alt="Star"
                          className="h-5 w-5 mr-2"
                        />
                        <span className="font-bold">{recipe.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>

      <div className="text-center mt-8">
        {recipesToShow > initialRecipesToShow ? (
          <button
            onClick={handleShowLess}
            className="bg-red-400 text-white px-6 py-2 rounded-full"
          >
            Collapse
          </button>
        ) : (
          <button
            onClick={handleLoadMore}
            className="bg-red-400 text-white px-6 py-2 rounded-full"
          >
            See more recipes
          </button>
        )}
      </div>

      <div className="flex-grow"></div>
      <Footer className="justify-self-end" />
    </div>
  );
};

export default FavouriteRecipes;
