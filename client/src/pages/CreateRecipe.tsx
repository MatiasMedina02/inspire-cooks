import { ChangeEvent, useEffect, useState } from "react";
import {
  ICreateRecipe,
  Ingredient,
  Instruction,
  RecipeCategory,
} from "../types";
import { usePostRecipeMutation } from "../redux/services/recipesApi";
import { ToastContainer, toast } from "react-toastify";
import { useAppSelector } from "../redux/hooks";
import Spinner from "../components/Spinner";

const CreateRecipe: React.FC = () => {
  const [dataRecipe, setDataRecipe] = useState<ICreateRecipe>({
    title: "",
    description: "",
    image: "",
    ingredients: [],
    instructions: [],
    category: RecipeCategory.Desserts,
    prepTime: 0,
    cookTime: 0,
    servings: 0,
  });
  const userData = useAppSelector(
    (state) => state.persistedReducer.user.userData
  );
  console.log(userData);
  
  const [postRecipe, { isError, isSuccess, isLoading }] =
    usePostRecipeMutation();
  const [inputIngredients, setInputIngredients] = useState<Ingredient[]>([
    {
      id: 1,
      type: "",
    },
  ]);
  const [inputInstructions, setInputInstructions] = useState<Instruction[]>([
    {
      order: 1,
      step: "",
    },
  ]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setDataRecipe({
      ...dataRecipe,
      [name]: value,
    });
  };

  const handleAddIngredient = () => {
    setInputIngredients((prevIngredients) => {
      const lastIngredient = prevIngredients[prevIngredients.length - 1];
      const lastIngredientId = lastIngredient ? lastIngredient.id : 0;
      return [...prevIngredients, { id: lastIngredientId + 1, type: "" }];
    });
  };

  const handleRemoveIngredient = (ingredientId: number) => {
    if(inputIngredients.length === 1){
      return;
    }
    setInputIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient.id !== ingredientId)
    );
    setDataRecipe((prevData) => ({
      ...prevData,
      ingredients: prevData.ingredients.filter(
        (ingredient) => ingredient.id !== ingredientId
      ),
    }));
  };

  const handleChangeIngredient = (
    event: ChangeEvent<HTMLInputElement>,
    ingredientId: number
  ) => {
    const ingredient = event.target.value;
    const newIngredient = { id: ingredientId, type: ingredient };
    const existingIngredient = dataRecipe.ingredients.find(
      (ingredient) => ingredient.id === ingredientId
    );

    if (existingIngredient) {
      const updatedIngredients = dataRecipe.ingredients.map((ingredient) =>
        ingredient.id === ingredientId ? newIngredient : ingredient
      );
      setDataRecipe((prevData) => ({
        ...prevData,
        ingredients: updatedIngredients,
      }));
    } else {
      setDataRecipe((prevData) => ({
        ...prevData,
        ingredients: [...prevData.ingredients, newIngredient],
      }));
    }
  };

  const handleAddInstruction = () => {
    setInputInstructions((prevInstructions) => {
      const lastInstruction = prevInstructions[prevInstructions.length - 1];
      const lastInstructionId = lastInstruction ? lastInstruction.order : 0;
      return [...prevInstructions, { order: lastInstructionId + 1, step: "" }];
    });
  };

  const handleRemoveInstruction = (orderId: number) => {
    if(inputInstructions.length === 1){
      return;
    }
    setInputInstructions((prevInstructions) =>
      prevInstructions.filter((instruction) => instruction.order !== orderId)
    );
    setDataRecipe((prevData) => ({
      ...prevData,
      instructions: prevData.instructions.filter(
        (instruction) => instruction.order !== orderId
      ),
    }));
  };

  const handleChangeInstruction = (
    event: ChangeEvent<HTMLInputElement>,
    instructionOrder: number
  ) => {
    const updatedInstruction = event.target.value;
    const newInstruction = {
      order: instructionOrder,
      step: updatedInstruction,
    };
    const existingInstruction = dataRecipe.instructions.find(
      (instruction) => instruction.order === instructionOrder
    );

    if (existingInstruction) {
      const updatedInstructions = dataRecipe.instructions.map((instruction) =>
        instruction.order === instructionOrder ? newInstruction : instruction
      );
      setDataRecipe((prevData) => ({
        ...prevData,
        instructions: updatedInstructions,
      }));
    } else {
      setDataRecipe((prevData) => ({
        ...prevData,
        instructions: [...prevData.instructions, newInstruction],
      }));
    }
  };

  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const reader = new FileReader();

    if (files && files.length > 0) {
      const file = files[0];
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setDataRecipe({
          ...dataRecipe,
          image: reader.result as string,
        });
      };
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // console.log({ recipe: dataRecipe, userId: /*userData.user._id*/ "64bfed7951d864b9351f4ed0" });
      await postRecipe({
        recipe: dataRecipe,
        userId: /*userData.user._id*/ "64bfed7951d864b9351f4ed0",
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Recipe created successfully", {
        autoClose: 3000,
      });
    }
    if (isError) {
      toast.error("Something went wrong. Error creating the recipe", {
        autoClose: 3000,
      });
    }
  }, [isError, isSuccess]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-2/3 min-h-screen pt-20 flex flex-col items-center mx-auto">
      <ToastContainer />
      <form className="w-full" onSubmit={handleSubmit}>
        {/* Image */}
        <div className="w-full border-4 border-dashed mb-4">
          <label className="cursor-pointer">
            {dataRecipe.image ? (
              <img
                className="w-full max-h-[450px] p-4"
                src={dataRecipe.image}
                alt={dataRecipe.title}
              />
            ) : (
              <div className="flex flex-col justify-center items-center p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-10 h-10 fill-slate-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V10.5z"
                    clipRule="evenodd"
                  />
                </svg>
                <h2 className="text-slate-400">
                  Upload your recipe image with other chefs
                </h2>
              </div>
            )}
            <input
              type="file"
              className="hidden"
              name="image"
              onChange={handleChangeImage}
            />
          </label>
        </div>

        {/* Info */}
        <div className="w-full p-4 bg-slate-100">
          <input
            className="w-full py-2 px-3 placeholder:text-3xl placeholder:font-bold text-3xl focus:outline-none"
            type="text"
            placeholder="Title: Lasagna"
            name="title"
            onChange={handleChange}
          />
          <textarea
            className="w-full mt-4 py-2 px-3 placeholder:text-xl placeholder:font-bold text-xl focus:outline-none resize-none overflow-hidden"
            rows={4}
            placeholder="Share a little more about this dish. What or who inspired you to cook it, what makes it special for you?"
            name="description"
            onChange={handleChange}
          ></textarea>

          {/* Additional Info */}
          <div className="w-full flex justify-between items-center space-x-4 pt-4">
            <input
              className="w-1/3 rounded-md py-2 px-4 focus:outline-none"
              type="number"
              name="prepTime"
              placeholder="Prep Time"
              onChange={handleChange}
            />
            <input
              className="w-1/3 rounded-md py-2 px-4 focus:outline-none"
              type="number"
              name="cookTime"
              placeholder="Cook Time"
              onChange={handleChange}
            />
            <input
              className="w-1/3 rounded-md py-2 px-4 focus:outline-none"
              type="number"
              name="servings"
              placeholder="Servings"
              onChange={handleChange}
            />
          </div>

          {/* Category */}
          <div className="w-full">
            <h3 className="py-4">Choose a category:</h3>
            <div className="w-full grid grid-cols-3 gap-3">
              {Object.values(RecipeCategory).map((category) => (
                <div key={category}>
                  <input
                    type="radio"
                    name="category"
                    id={category}
                    value={category}
                    className="peer hidden"
                    checked={dataRecipe.category === category}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor={category}
                    className="block cursor-pointer select-none rounded-xl p-2 text-center bg-slate-300 peer-checked:bg-orange-500 peer-checked:font-bold peer-checked:text-white"
                  >
                    <span>{category}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="w-full my-4 p-4 bg-slate-100">
          <h2>Ingredients</h2>
          {inputIngredients.map((ingredient) => (
            <div className="flex mt-4" key={ingredient.id}>
              <input
                className="w-full py-2 px-3 placeholder:text-lg placeholder:font-bold text-lg focus:outline-none"
                type="text"
                placeholder="E.g: 100g flour"
                onChange={(event) =>
                  handleChangeIngredient(event, ingredient.id)
                }
              />
              <button
                className="mx-4"
                type="button"
                onClick={() => handleRemoveIngredient(ingredient.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 stroke-slate-500 stroke-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          ))}
          <div className="w-full flex justify-center mt-4">
            <button
              className="flex items-center p-2 space-x-1"
              onClick={handleAddIngredient}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-6 h-6 stroke-slate-500 stroke-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <h4 className="text-slate-500">Ingredient</h4>
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="w-full mb-4 p-4 bg-slate-100">
          <h2>Steps</h2>
          {inputInstructions.map((instruction) => (
            <div className="flex mt-4" key={instruction.order}>
              <input
                className="w-full py-2 px-3 placeholder:text-lg placeholder:font-bold text-lg focus:outline-none"
                type="text"
                placeholder="E.g: Mix flour with water until..."
                onChange={(event) =>
                  handleChangeInstruction(event, instruction.order)
                }
              />
              <button
                className="mx-4"
                type="button"
                onClick={() => handleRemoveInstruction(instruction.order)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 stroke-slate-500 stroke-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          ))}
          <div className="w-full flex justify-center mt-4">
            <button
              className="flex items-center p-2 space-x-1"
              onClick={handleAddInstruction}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-6 h-6 stroke-slate-500 stroke-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <h4 className="text-slate-500">Step</h4>
            </button>
          </div>
        </div>
        <button className="bg-orange-500 rounded p-2" type="submit">
          Post Recipe
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
