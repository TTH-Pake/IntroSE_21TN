import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../modules/Navbar";
import Footer from "../modules/Footer";
import { UserContext } from "../../context/userContext";
import { handleCreateRecipe } from "../../action/recipesAction";
import cookingICon from "../../assets/cooking.png";
import cookingBookICon from "../../assets/cook-book.png";
import deleteICon from "../../assets/trash_can.svg";
import { checkAuth } from "../../action/accountAction";
import { notify_fail, notify_success, Toast_Container } from "../../toast";
import { message } from "antd";

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
    console.log(ingredientsList);
    console.log("Add ingredient");
  };

  const handleChangeIngredient = (event) => {
    const index = event.target.id;
    console.log("id: ", index);
    const newIngredientsList = [...ingredientsList];
    newIngredientsList[index] = event.target.value;
    setIngredientsList(newIngredientsList);
    console.log(ingredientsList);
    console.log("Change ingredient");
  };

  const handleRemove = (index) => {
    const newIngredientsList = [...ingredientsList];
    newIngredientsList.splice(index, 1);
    setIngredientsList(newIngredientsList);
    console.log(ingredientsList);
    console.log("Remove");
  };

  const handleAdd = () => {
    setIsAddingIngredient(false);

    console.log(ingredientsList);
    console.log("Add");
  };

  const handleCancel = () => {
    setIsAddingIngredient(false);
    setIngredientsList(ingredientsList.slice(0, -1));
    console.log("Cancel");
  };
  return (
    <div className="flex items-center">
      <h1 className="text-2xl w-1/6 font-bold mr-4">Ingredient</h1>
      <div className="flex-col w-5/6 items-start space-y-2">
        {ingredientsList.map((ingredient, index) => (
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
      <div className="col-span-2 mr-16 flex flex-col items-center justify-center text-2xl font-bold">
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
            className="general-info-form-recipe-name-input w-5/6 border border-gray-300 rounded-2xl p-2 "
            type="text"
            placeholder="Recipe Name"
            onChange={(e) => {
              setRecipeName(e.target.value);
            }}
          />
        </div>

        <div className="flex items-center">
          <h1 className="font-bold w-1/6 mr-4">Prep-time</h1>
          <input
            className="general-info-form-prep-time-input w-5/6 border border-gray-300 rounded-2xl p-2"
            type="text"
            placeholder="Prep-time"
            onChange={(e) => {
              setPrepTime(e.target.value);
            }}
          />
        </div>

        <div className="flex items-center">
          <h1 className="font-bold w-1/6 mr-4">Cook-time</h1>
          <input
            className="general-info-form-prep-cook-title w-5/6 border border-gray-300 rounded-2xl p-2"
            type="text"
            placeholder="Cook-time"
            onChange={(e) => {
              setCookTime(e.target.value);
            }}
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
      <h1 className="w-1/12 font-bold text-xl">Step {index + 1}</h1>

      <input
        className="flex-shrink-0 w-10/12 text-center border-2 border-blue-400 p-2 rounded"
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

const InstructionInfo = ({ steps, setSteps }) => {
  const [isAddingStep, setIsAddingStep] = useState(false);

  const handleAddStep = () => {
    setIsAddingStep(true);
    setSteps([...steps, ""]);
    console.log(steps);
    console.log("Add step");
  };

  const handleChangeStep = (event) => {
    const index = event.target.id;
    console.log("id: ", index);
    const newSteps = [...steps];
    newSteps[index] = event.target.value;
    setSteps(newSteps);
    console.log(steps);
    console.log("Change step");
  };

  const handleRemove = (index) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
    console.log(steps);
    console.log("Remove");
  };

  const handleAdd = () => {
    setIsAddingStep(false);
    console.log(steps);
    console.log("Add");
  };

  const handleCancel = () => {
    setIsAddingStep(false);
    setSteps(steps.slice(0, -1));
    console.log("Cancel");
  };

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

          <div className="flex flex-col w-full">
            {steps.map((step, index) => (
              <Step
                key={index}
                index={index}
                step={step}
                isAddingStep={isAddingStep}
                handleChangeStep={handleChangeStep}
                handleRemove={handleRemove}
              />
            ))}
            {!isAddingStep ? (
              <div className="flex justify-center items-center space-x-4 mt-3">
                <button
                  onClick={handleAddStep}
                  className="font-bold bg-green-500 text-white py-2 px-4 rounded-full"
                >
                  Add step
                </button>
              </div>
            ) : (
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
      </div>
    </div>
  );
};

const SubmitForm = ({ onSubmit }) => {
  return (
    <div className="flex flex-row justify-around">
      <button
        onClick={() => onSubmit}
        className="text-2xl bg-red-300 px-4 py-2 mt-4 rounded-full font-bold"
      >
        Submit
      </button>
    </div>
  );
};

const CreateRecipeForm = () => {
  const [recipeName, setRecipeName] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  // const [ingredients, setIngredients] = useState([]); // [1, 2, ...]
  const [ingredientsList, setIngredientsList] = useState([]); // ["100g flour", "100ml water" ...
  const [steps, setSteps] = useState([]);
  const [nutritions, setNutritions] = useState([]); // ["Fat 10g  20%", "Protein 20g  40%", ...

  const onSubmit = async () => {
    const recipe = {
      recipe_name: recipeName,
      prep_time: prepTime,
      cook_time: cookTime,
      ingredients_list: ingredientsList,
      steps: steps,
      nutritions: [],
    };
    console.log(recipe);
    if (recipeName === "" || prepTime === "" || cookTime === "") {
      notify_fail("Please fill in all fields");
      return;
    }
    if (await handleCreateRecipe(recipe)) {
      notify_success("Create recipe successfully");
    }

    console.log("Submit");
  };

  return (
    <div className="flex flex-col items-center bg-white justify-center">
      <h1 className="text-3xl font-bold text-center mt-4">ĐĂNG CÔNG THỨC</h1>
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
      <InstructionInfo steps={steps} setSteps={setSteps} />
      <SubmitForm onSubmit={onSubmit} />
      <Toast_Container />
    </div>
  );
};

export default function CreateRecipe() {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!checkAuth()) {
      navigate("/login", { state: { from: location } }); // Chuyển hướng người dùng đến trang đăng nhập
      message.error("Please login to create recipe!");
    }
  }, [user]);

  return (
    <div className="home-wrapper h-screen overflow-y-auto bg-white">
      <NavBar />
      <CreateRecipeForm />
      <Footer />
    </div>
  );
}
