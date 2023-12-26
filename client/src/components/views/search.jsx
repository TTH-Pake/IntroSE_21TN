/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import starIcon from "/src/assets/star.png";
import trashCan from "/src/assets/trash_can.svg";
import { handleSearchRecipes } from "../../action/recipesAction";
import { handleGetAllIngredientName } from "../../action/ingredientAction";
import { message } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LogoIcon from "../modules/LogoIcon";
import Avatar from "../modules/Avatar";
import loupe from "/src/assets/loupe.png";
import commentIcon from "/src/assets/chat.png";
import likeIcon from "/src/assets/heart.png";
import Menu from "../modules/Menu";

const initialRecipesToShow = 10;

const Search = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipesToShow, setRecipesToShow] = useState(initialRecipesToShow);
  const [name, setName] = useState("");
  const [list_recipes, setListRecipes] = useState([]);
  const location = useLocation();
  const keywords = new URLSearchParams(location.search).get("keywords");
  const [isOpen, setIsOpen] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const fetchRecommendedRecipes = async () => {
      const newRecipes = await handleSearchRecipes(keywords);
      setListRecipes(newRecipes);
      setRecipesToShow(initialRecipesToShow);
    };
    fetchRecommendedRecipes();
  }, [keywords, handleSearchRecipes, initialRecipesToShow, setListRecipes]);

  useEffect(() => {
    const fetchIngredients = async () => {
      const result = await handleGetAllIngredientName();
      if (result !== false) {
        setIngredients(result);
      } else {
        console.error("Failed to fetch ingredients");
      }
    };

    fetchIngredients();
  }, [keywords]);

  const handleAvatarClick = () => {
    setShowLoginForm(!showLoginForm);
    setShowMenu(false);
  };

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
    setShowLoginForm(false);
  };

  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();

    var keyWordSearch = selectedIngredients.join(",") + "," + name;
    if (selectedIngredients.length === 0 || name === "")
      keyWordSearch = selectedIngredients.join(",") + name;

    if (keyWordSearch === "") {
      message.warning("Vui lòng điền thông tin tìm kiếm");
      return;
    }
    navigate(`/search?keywords=${encodeURIComponent(keyWordSearch)}`);
  };

  let recipes = list_recipes.slice(0, recipesToShow);

  const handleLoadMore = () => {
    setRecipesToShow(20); // Show all recipes
    recipes = list_recipes.slice(0, 20);
  };

  const handleShowLess = () => {
    recipes = list_recipes.slice(0, 10);
    setRecipesToShow(10); // Show initial number of recipes
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  const handleIngredientClick = (ingredient) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };
  const handleDeleteIngredient = (index) => {
    const updatedIngredients = [...selectedIngredients];
    updatedIngredients.splice(index, 1);
    setSelectedIngredients(updatedIngredients);
  };

  const renderIngredientList = () => {
    return ingredients
      .filter((item) => item.toLowerCase().includes(searchTerm))
      .map((filteredItem, index) => (
        <a
          key={index}
          href="#"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
          onClick={() => handleIngredientClick(filteredItem)}
        >
          {filteredItem}
        </a>
      ));
  };

  return (
    <div className="container border-t mx-auto">
      <nav className="navbar flex flex-col relative items-center justify-center align-middle px-6 h-[80px] bg-white border-b">
        <Link to="/home">
          <LogoIcon className="flex-shrink-0" />
        </Link>

        <div className="relative w-1/2 rounded-lg">
          <form onSubmit={handleSearch}>
            <input
              className="search-input w-full px-4 py-2 border bg-green-500 outline-none placeholder-gray-700 pl-10"
              style={{ borderRadius: "12px" }}
              type="text"
              placeholder="Tìm kiếm công thức..."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <button
              onClick={handleSearch}
              type="submit"
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
            >
              <img src={loupe} alt="Search" className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="flex-shrink-0 flex items-center space-x-10 bg-white">
          <Avatar
            showLoginForm={showLoginForm}
            setShowLoginForm={setShowLoginForm}
            onClick={handleAvatarClick}
          />
          <Menu
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            onClick={handleMenuClick}
          />
        </div>
      </nav>

      <div className="flex">
        <div className="px-3 w-1/4 p-7 mr-2">
          <button
            className="flex w-full py-2 text-white bg-red-600 w-100 justify-center rounded-full mb-4 "
            onClick={handleSearch}
          >
            Filters
          </button>
          <div className="min-h-screen flex justify-center">
            <div className="relative group w-full">
              <div className="selectedIngredients mb-4">
                <ul>
                  {selectedIngredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center">
                      <img
                        src={trashCan}
                        alt="TrashCan"
                        className="h-4 w-4 mr-2 cursor-pointer"
                        onClick={() => handleDeleteIngredient(index)}
                      />
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                id="dropdown-button"
                className="flex m-auto justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                onClick={toggleDropdown}
              >
                <span className="mr-2">Ingredients</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 ml-2 -mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div
                id="dropdown-menu"
                className={`absolute w-full right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 ${
                  isOpen ? "" : "hidden"
                }`}
              >
                <input
                  id="search-input"
                  className="block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none"
                  type="text"
                  placeholder="Search items"
                  autoComplete="off"
                  value={searchTerm}
                  onChange={handleInputChange}
                />
                <div className="scrollable-menu max-h-48 overflow-y-auto">
                  {renderIngredientList()}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-3/4 mt-3 mr-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
            {recipes.map((recipe, index) => (
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
          <div className="text-center justify-center mt-8">
            {list_recipes.length > initialRecipesToShow && (
              <>
                {recipesToShow > initialRecipesToShow ? (
                  <button
                    onClick={handleShowLess}
                    className="bg-red-400 text-white px-6 py-2 rounded-full mb-3"
                  >
                    Rút gọn
                  </button>
                ) : (
                  <button
                    onClick={handleLoadMore}
                    className="bg-red-400 text-white px-6 py-2 rounded-full mb-3"
                  >
                    Xem thêm
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
