import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { message } from "antd";
import { useCookies } from "react-cookie";
import { handleGetAllIngredientID } from "../../action/ingredientAction";
import { handleSearchRecipesID } from "../../action/recipesAction";
import {
  handleGetCurrentUser,
  handleUpdateRecipe,
} from "../../action/userAction";
import cookingBookICon from "../../assets/cook-book.png";
import cookingICon from "../../assets/cooking.png";
import deleteICon from "../../assets/trash_can.svg";
import { Toast_Container, notify_success } from "../../toast";
import Footer from "../modules/Footer";
import NavBar from "../modules/Navbar";

const Ingredient = ({
  index,
  ingredient,
  isAddingIngredient,
  handleChangeIngredient,
  handleRemove,
}) => {
  return (
    <div className="flex flex-row items-center space-x-4 p-1 bg-green-500 rounded-lg">
      <input
        className="flex-shrink-0 p-2 rounded-lg text-center w-full"
        type="text"
        id={index}
        onChange={handleChangeIngredient}
        placeholder="100g flour"
        value={ingredient}
      />
      {!isAddingIngredient ? (
        <img
          src={deleteICon}
          alt="delete ICon"
          className="w-6 h-6 cursor-pointer hover:opacity-80 transition duration-300"
          onClick={() => {
            handleRemove(index);
          }}
        />
      ) : null}
    </div>
  );
};

const IngredientsList = ({
  ingredients,
  setIngredients,
  ingredientsList,
  setIngredientsList,
}) => {
  const [isAddingIngredient, setIsAddingIngredient] = useState(false);
  const handleAddIngredient = () => {
    setIsAddingIngredient(true);

    setIngredientsList([...ingredientsList, ""]);
  };

  const handleChangeIngredient = (event) => {
    const index = event.target.id;
    const newIngredientsList = [...ingredientsList];
    newIngredientsList[index] = event.target.value;
    setIngredientsList(newIngredientsList);
  };

  const handleRemove = (index) => {
    const newIngredientsList = [...ingredientsList];
    newIngredientsList.splice(index, 1);
    setIngredientsList(newIngredientsList);
  };

  const handleAdd = () => {
    setIsAddingIngredient(false);
  };

  const handleCancel = () => {
    setIsAddingIngredient(false);
    setIngredientsList(ingredientsList.slice(0, -1));
  };

  return (
    <div className="flex items-center">
      <h1 className="text-2xl w-1/6 font-bold mr-4">Ingredient</h1>
      <div className="flex-col w-5/6 items-start space-y-2">
        {ingredientsList &&
          ingredientsList.map((ingredient, index) => (
            <Ingredient
              key={index}
              index={index}
              ingredient={ingredient}
              isAddingIngredient={isAddingIngredient}
              handleChangeIngredient={handleChangeIngredient}
              handleRemove={handleRemove}
            />
          ))}
        {!isAddingIngredient && (
          <button
            onClick={handleAddIngredient}
            className="mx-auto flex justify-center items-center text-center font-bold bg-green-500 text-white py-2 px-4 mt-3 rounded-full"
          >
            Add ingredient
          </button>
        )}
        {isAddingIngredient && (
          <div className="flex justify-center items-center space-x-4 mt-3">
            <button
              onClick={handleAdd}
              className="font-bold bg-green-500 text-white py-2 px-4 rounded-full"
            >
              Add
            </button>
            <button
              onClick={handleCancel}
              className="font-bold bg-red-500 text-white py-2 px-4 rounded-full"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const GeneralInfo = ({
  recipeName,
  setRecipeName,
  prepTime,
  setPrepTime,
  cookTime,
  setCookTime,
  ingredients,
  setIngredients,
  ingredientsList,
  setIngredientsList,
}) => {
  return (
    <div className="grid grid-cols-8 gap-4 bg-green-300 rounded-2xl p-14 ml-16 mr-16 mt-4">
      <div className="col-span-2 mr-16 flex flex-col items-center justify-center text-2xl font-bold flex-shrink-0">
        <img
          src={cookingBookICon}
          alt="Cooking Book Icon"
          className="w-8 h-8 mb-2"
        />
        General Information
      </div>

      <div className="general-info-form col-span-6 flex flex-col space-y-4 w-full">
        <div className="flex items-center">
          <h1 className="font-bold w-1/6 mr-4">Recipe Name</h1>
          <input
            className="general-info-form-recipe-name-input w-5/6 border border-gray-300 rounded-2xl p-2 text-center "
            type="text"
            placeholder="Recipe Name"
            onChange={(e) => {
              setRecipeName(e.target.value);
            }}
            value={recipeName}
          />
        </div>

        <div className="flex items-center">
          <h1 className="font-bold w-1/6 mr-4">Prep-time</h1>
          <input
            className="general-info-form-prep-time-input w-5/6 border border-gray-300 rounded-2xl p-2 text-center"
            type="text"
            placeholder="Prep-time"
            onChange={(e) => {
              setPrepTime(e.target.value);
            }}
            value={prepTime}
          />
        </div>

        <div className="flex items-center">
          <h1 className="font-bold w-1/6 mr-4">Cook-time</h1>
          <input
            className="general-info-form-prep-cook-title w-5/6 border border-gray-300 rounded-2xl p-2 text-center"
            type="text"
            placeholder="Cook-time"
            onChange={(e) => {
              setCookTime(e.target.value);
            }}
            value={cookTime}
          />
        </div>

        <IngredientsList
          ingredients={ingredients}
          setIngredients={setIngredients}
          ingredientsList={ingredientsList}
          setIngredientsList={setIngredientsList}
          className="flex-grow"
        />
      </div>
    </div>
  );
};

const Step = ({
  index,
  step,
  isAddingStep,
  handleChangeStep,
  handleRemove,
}) => {
  return (
    <div className="flex flex-row items-center space-x-4 p-3 rounded-lg w-full">
      <h1 className="w-2/12 font-bold text-xl flex-shrink-0 ">
        Step {index + 1}{" "}
      </h1>
      <input
        className="flex-shrink-0 w-full border-2 border-blue-400 p-2 rounded"
        type="text"
        id={index}
        onChange={handleChangeStep}
        placeholder="Pour water into a bowl"
        value={step}
      />

      {!isAddingStep ? (
        <img
          src={deleteICon}
          alt="delete ICon"
          className="w-6 h-6 cursor-pointer hover:opacity-80 transition duration-300"
          onClick={() => {
            handleRemove(index);
          }}
        />
      ) : null}
    </div>
  );
};

const StepsList = ({ stepsList, setStepsList }) => {
  const [isAddingStep, setIsAddingStep] = useState(false);

  const handleAddStep = () => {
    setIsAddingStep(true);
    setStepsList([...stepsList, ""]);
  };

  const handleChangeStep = (event) => {
    const index = event.target.id;
    const newStepsList = [...stepsList];
    newStepsList[index] = event.target.value;
    setStepsList(newStepsList);
  };

  const handleRemove = (index) => {
    const newStepsList = [...stepsList];
    newStepsList.splice(index, 1);
    setStepsList(newStepsList);
  };

  const handleAdd = () => {
    setIsAddingStep(false);
  };

  const handleCancel = () => {
    setIsAddingStep(false);
    setStepsList(stepsList.slice(0, -1));
  };

  return (
    <div className="flex items-center w-2/3">
      <div className="flex-col w-full items-start space-y-2">
        {stepsList &&
          stepsList.map((step, index) => (
            <Step
              key={index}
              index={index}
              step={step}
              isAddingStep={isAddingStep}
              handleChangeStep={handleChangeStep}
              handleRemove={handleRemove}
            />
          ))}

        {!isAddingStep && (
          <button
            onClick={handleAddStep}
            className="mx-auto flex justify-center items-center text-center font-bold bg-green-500 text-white py-2 px-4 mt-3 rounded-full"
          >
            Add step
          </button>
        )}
        {isAddingStep && (
          <div className="flex justify-center items-center space-x-4 mt-3">
            <button
              onClick={handleAdd}
              className="font-bold bg-green-500 text-white py-2 px-4 rounded-full"
            >
              Add
            </button>
            <button
              onClick={handleCancel}
              className="font-bold bg-red-500 text-white py-2 px-4 rounded-full"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const InstructionInfo = ({ stepsList, setStepsList }) => {
  return (
    <div className="grid grid-cols-8 gap-4 bg-blue-300 rounded-2xl p-14 ml-16 mr-16 mt-4">
      <div className="col-span-2 mr-16 flex flex-col items-center justify-center text-center text-2xl font-bold">
        <img src={cookingICon} alt="Cooking Icon" className="w-8 h-8 mb-2" />
        Instruction Information
      </div>

      <div className="instruction-info-form col-span-6 space-y-3">
        <div className="flex flex-col items-center">
          <h1 className="instruction-info-form-steps-title font-bold text-3xl mb-3">
            Steps
          </h1>

          <StepsList
            stepsList={stepsList}
            setStepsList={setStepsList}
            className="flex-grow"
          />
        </div>
      </div>
    </div>
  );
};

const SubmitForm = ({ onSubmit }) => {
  return (
    <div className="flex flex-row justify-around">
      <button
        onClick={() => {
          onSubmit();
        }}
        className="text-2xl bg-red-300 px-4 py-2 mt-4 rounded-full font-bold"
      >
        Submit
      </button>
    </div>
  );
};

const UpdateRecipeForm = ({ recipe_id, accessToken }) => {
  const [recipeName, setRecipeName] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [ingredientsList, setIngredientsList] = useState([]); // ["100g flour", "100ml water" ...
  const [ingredients, setIngredients] = useState([]); // ["flour", "water" ...
  const [ingredientIDs, setIngredientIDs] = useState([]); // [1, 2, 3, ...
  const [steps, setSteps] = useState([]);
  const [nutritions, setNutritions] = useState([]); // ["Fat 10g  20%", "Protein 20g  40%", ...
  const [directions, setDirections] = useState(""); // ["Pour water into a bowl", "Mix flour with water" ...
  const navigate = useNavigate();

  // Fetch existing recipe data when component mounts
  useEffect(() => {
    const fetchRecipeData = async () => {
      const recipeData = await handleSearchRecipesID(recipe_id);
      if (!recipeData.directions) {
        recipeData.directions = "";
      }
      const recipe_directions = recipeData.directions.split(/\.\n|\./);
      const step_directions = recipe_directions.filter((step) => step !== "");
  
      setRecipeName(recipeData?.recipe_name);
      setPrepTime(recipeData?.prep_time);
      setCookTime(recipeData?.cook_time);
      setIngredientsList(recipeData?.ingredients_list);
      setIngredients(recipeData?.ingredients);
      setSteps(step_directions);
      setNutritions(recipeData?.nutritions);
      setDirections(recipeData?.directions);
  
    };

    fetchRecipeData();
  }, [recipe_id]);

  useEffect(() => {

    const fetchIngredientIDs = async () => {
    const ingredientsData = await handleGetAllIngredientID();
    const matchingIngredients = ingredientsData.filter(ingredient =>
      ingredientsList.find(listItem =>
        listItem.toLowerCase().includes(ingredient.name.toLowerCase())
      )
    );
    // Map the matching ingredients to their IDs
    setIngredientsList(ingredientsList);
    const IngredientIDs = matchingIngredients.map(ingredient => ingredient.id);
    setIngredientIDs(IngredientIDs);

      };
    fetchIngredientIDs();


  }, [recipeName, prepTime, cookTime, ingredients, steps, nutritions, directions]);

  const onSubmit = async () => {
    
    const ingredientsData = await handleGetAllIngredientID();
    
    const matchingIngredients = ingredientsData.filter(ingredient =>
      ingredientsList.find(listItem =>
        listItem.toLowerCase().includes(ingredient.name.toLowerCase())
      )
    );
    // Map the matching ingredients to their IDs
    const IngredientIDs = matchingIngredients.map(ingredient => ingredient.id);
    setIngredientIDs(IngredientIDs);

    const recipe = {
      recipe_name: recipeName,
      prep_time: prepTime,
      cook_time: cookTime,
      ingredients_list: ingredientsList,
      ingredients: ingredientIDs,
      directions: directions,
      nutritions: nutritions,
      img_src: "",
    };

    const updateRecipe = await handleUpdateRecipe(
      recipe_id,
      recipe,
      accessToken
    );

    if (updateRecipe) {
      notify_success("Update recipe successfully!");
      navigate(`/recipes/?ID=${recipe_id}`);
    }
  };

  return (
    <div className="flex flex-col items-center bg-white justify-center">
      <h1 className="text-3xl font-bold text-center mt-4">Update Recipe</h1>
      <GeneralInfo
        recipeName={recipeName}
        setRecipeName={setRecipeName}
        prepTime={prepTime}
        setPrepTime={setPrepTime}
        cookTime={cookTime}
        setCookTime={setCookTime}
        ingredientsList={ingredientsList}
        setIngredientsList={setIngredientsList}
      />
      <InstructionInfo
        stepsList={steps} // Use stepsList instead of stepLists
        setStepsList={setSteps} // Use setStepsList instead of setStepLists
      />

      <SubmitForm onSubmit={onSubmit} />
      <Toast_Container />
    </div>
  );
};

export default function UpdateRecipe() {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const recipe_id = location.pathname.split("/")[2];

  useEffect(() => {
    const getUser = async () => {
      const user = await handleGetCurrentUser(cookies.accessToken);
      setUser(user);
    };
  }, [cookies.accessToken]);

  return (
    <div className="home-wrapper h-screen overflow-y-auto bg-white">
      <NavBar />
      <UpdateRecipeForm
        recipe_id={recipe_id}
        accessToken={cookies.accessToken}
      />
      <Footer />
    </div>
  );
}
