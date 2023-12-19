import { useEffect, useState } from "react";
import starIcon from "/src/assets/star.png";
import commentIcon from "/src/assets/chat.png";
import likeIcon from "/src/assets/heart.png";
import { handleRecommendedRecipes } from "../../action/recipesAction";
import { Link } from "react-router-dom";

const RecommendRecipe = () => {
    const initialRecipesToShow = 5;
    const [recipesToShow, setRecipesToShow] = useState(initialRecipesToShow);
    const [listRecipes, setListRecipes] = useState([]);

    useEffect(() => {
        const fetchRecommendedRecipes = async () => {
            const recommendedRecipes = await handleRecommendedRecipes();
            setListRecipes(recommendedRecipes);
        };
        fetchRecommendedRecipes();
    }, []);

    const handleLoadMore = () => {
        setRecipesToShow((prev) => Math.min(prev + 10, listRecipes.length));
    };

    const handleShowLess = () => {
        setRecipesToShow(initialRecipesToShow);
    };

    return (
        <div className="container border-t mx-auto px-4 py-7">
            <h2 className="text-2xl font-bold mb-6">Recommended recipes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
                {listRecipes && listRecipes.slice(0, recipesToShow).map((recipe, index) => (
                    <Link to={`/recipes/?ID=${recipe.recipe_id}`} key={recipe.recipe_id}>
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
                                            <img src={commentIcon} alt="comment" className="h-5 w-5 mr-2" />
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        {/* Star (Rating) Icon */}
                                        <div className="flex items-center">
                                            <img src={starIcon} alt="Star" className="h-5 w-5 mr-2" />
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
        </div>
    );
};

export default RecommendRecipe;
