import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import commentIcon from "/src/assets/chat.png";
import likeIcon from "/src/assets/heart.png";
import starIcon from "/src/assets/star.png";

const RelatedRecipes = ({ relatedRecipes }) => {
  const navigate = useNavigate();

  const onCardClick = (recipeId) => {
    navigate(`/recipes/?ID=${recipeId}`);
  };



  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
      {(relatedRecipes || []).map((recipe, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow overflow-hidden transform transition duration-500 hover:scale-105 h-full"
          onClick={() => onCardClick(recipe.recipe_id)}
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
                  <img src={starIcon} alt="Star" className="h-5 w-5 mr-2" />
                  <span className="font-bold">{recipe.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

RelatedRecipes.propTypes = {
  relatedRecipes: PropTypes.array,
};

export default RelatedRecipes;
