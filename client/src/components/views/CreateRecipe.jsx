import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../modules/Navbar";
import Footer from "../modules/Footer";
import { UserContext } from "../../context/userContext";
import { handleCreateRecipe } from "../../action/recipesAction";

const Ingredient = ({
  index,
  ingredient,
  isAddingIngredient,
  handleChangeIngredient,
  handleRemove,
}) => {
  return (
    <div className="flex flex-row">
      <input
        className="text-xl"
        type="text"
        id={index}
        onChange={handleChangeIngredient}
        placeholder="100g flour"
        value={ingredient}
      />
      {!isAddingIngredient ? (
        <button
          className="text-xl"
          onClick={() => {
            handleRemove(index);
          }}
        >
          Remove
        </button>
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
    // setIngredientElements([
    //   ...ingredients,
    //   <div key={ingredientElements.length} className="flex flex-row">
    //     <input className="text-xl" type="text" placeholder="100g flour" />
    //     <button className="text-xl">Remove</button>
    //   </div>,
    // ]);
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
    // const newIngredients = [...ingredients];
    // const newIngredients = ingredients.filter(
    //   (ingredient) => ingredient !== ""
    // );
    // setIngredients(newIngredients);
    // setIngredients([...ingredients, ""]);

    console.log(ingredientsList);
    console.log("Add");
  };

  const handleCancel = () => {
    setIsAddingIngredient(false);
    setIngredientsList(ingredientsList.slice(0, -1));
    console.log("Cancel");
  };
  return (
    <div className="flex flex-col bg-orange-300 p-2 m-2">
      <h1 className="text-3xl font-bold">Ingredient</h1>
      <div className="flex flex-col">
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
        {/* <input className="text-xl" type="text" placeholder="100g flour" /> */}
        {!isAddingIngredient ? (
          <div className="flex flex-col">
            <button
              onClick={handleAddIngredient}
              className="text-2xl font-bold"
            >
              Add ingredient
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            <button onClick={handleAdd} className="text-2xl font-bold">
              Add
            </button>
            <button onClick={handleCancel} className="text-2xl font-bold">
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
    <div className="general-info-wrapper flex flex-row items-center justify-around">
      <div className="general-info-title flex">
        <h1 className="text-3xl font-bold">General Information</h1>
      </div>
      <div className="general-info-form flex flex-col">
        <div className="general-info-form-child general-info-form-recipe-name flex flex-col bg-orange-300 p-2 m-2">
          <h1 className="general-info-form-recipe-name-title text-xl">
            Recipe Name
          </h1>
          <input
            className="general-info-form-recipe-name-input text-xl"
            type="text"
            placeholder="Recipe Name"
            onChange={(e) => {
              setRecipeName(e.target.value);
            }}
          />
        </div>

        <div className="general-info-form-child general-info-form-prep-time flex flex-row justify-around bg-orange-300 p-2 m-2">
          <h1 className="general-info-form-prep-time-title text-xl">
            Prep-time
          </h1>
          <input
            className="general-info-form-prep-time-input text-xl"
            type="text"
            onChange={(e) => {
              setPrepTime(e.target.value);
            }}
          />
        </div>

        <div className="general-info-form-child general-info-form-cook-time flex flex-row justify-around bg-orange-300 p-2 m-2">
          <h1 className="general-info-form-cook-time-title text-2xl font-bold">
            Cook-time
          </h1>
          <input
            className="general-info-form-prep-cook-title text-xl"
            type="text"
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
    <div className="flex flex-row">
      <h1 className="text-xl m-2">Step {index + 1}</h1>
      <input
        className="text-xl"
        type="text"
        id={index}
        onChange={handleChangeStep}
        placeholder="Pour water into a bowl"
        value={step}
      />
      {!isAddingStep ? (
        <button
          className="text-xl"
          onClick={() => {
            handleRemove(index);
          }}
        >
          Remove
        </button>
      ) : null}
    </div>
  );
};

const InstructionInfo = ({ steps, setSteps }) => {
  // const [steps, setSteps] = useState([]);
  // const [nutritions, setNutritions] = useState([]); // [calories, fat, protein, carbs
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
    <div className="flex flex-row justify-around">
      <div className="instruction-info-title flex">
        <h1 className="text-3xl font-bold">Instruction Information</h1>
      </div>
      <div className="instruction-info-form flex flex-col">
        <div className="instruction-info-form-child instruction-info-form-steps flex flex-col bg-orange-300 p-2 m-2">
          <h1 className="instruction-info-form-steps-title text-xl">Steps</h1>
          <div className="flex flex-col">
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
              <div className="flex flex-col">
                <button onClick={handleAddStep} className="text-2xl font-bold">
                  Add step
                </button>
              </div>
            ) : (
              <div className="flex flex-col">
                <button onClick={handleAdd} className="text-2xl font-bold">
                  Add
                </button>
                <button onClick={handleCancel} className="text-2xl font-bold">
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
      <button onClick={onSubmit} className="text-2xl font-bold">
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
      console.log("Please fill in all fields");
      return;
    }
    if (await handleCreateRecipe(recipe)) {
      console.log("Create recipe successfully");
    }

    console.log("Submit");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <GeneralInfo
        recipeName={recipeName}
        setRecipeName={setRecipeName}
        prepTime={prepTime}
        setPrepTime={setPrepTime}
        cookTime={cookTime}
        setCookTime={setCookTime}
        // ingredients={ingredients}
        // setIngredients={setIngredients}
        ingredientsList={ingredientsList}
        setIngredientsList={setIngredientsList}
      />
      <InstructionInfo steps={steps} setSteps={setSteps} />
      <SubmitForm onSubmit={onSubmit} />
    </div>
  );
};

export default function CreateRecipe() {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  if (!user) {
    navigate("/login");
  }
  return (
    <div className="home-wrapper h-screen overflow-y-auto bg-slate-200">
      <NavBar />
      <CreateRecipeForm />
      <Footer />
    </div>
  );
}
