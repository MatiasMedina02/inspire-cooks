import { ICreateRecipe, IUpdateRecipe } from "../types";
import RecipeModel from "../models/Recipe";
import cloudinary from "../utils/cloudinary";
import UserModel from "../models/User";
import { Types } from "mongoose";
import CommentModel from "../models/Comment";

export const getAllRecipes = async () => {
  const allRecipes = await RecipeModel.find({});

  return allRecipes;
};

export const getRecipeById = async (id: string) => {
  const recipeFound = await RecipeModel.findById(id).populate("author").exec();
  if (!recipeFound) throw new Error("Recipe not found");

  // const author = await UserModel.findById(recipeFound.author);
  // if(!author) throw new Error("Author not found");

  const comments = await CommentModel.find({ _id: { $in: recipeFound.comments } }).populate("author").exec();

  // recipeFound.author = author;
  recipeFound.comments = comments;

  return recipeFound;
};

export const postRecipe = async ({
  title,
  description,
  image,
  instructions,
  ingredients,
  category,
  prepTime,
  cookTime,
  servings
}: ICreateRecipe, userId: string) => {
  const recipeExists = await RecipeModel.findOne({ title });
  if (recipeExists) throw new Error("Recipe already exists");

  const user = await UserModel.findById(userId);
  if(!user) throw new Error("User not found");

  const recipeImage = await cloudinary.uploader.upload(image, {
    folder: "recipes",
  });

  const newRecipe = await RecipeModel.create({
    title,
    description,
    image: { public_id: recipeImage.public_id, url: recipeImage.secure_url },
    ingredients,
    instructions,
    category,
    prepTime,
    cookTime,
    totalTime: prepTime + cookTime,
    servings,
    author: user._id,
  });

  user.recipes.push(newRecipe._id);
  await user.save()

  return "Recipe created successfully";
};

export const deleteRecipe = async (id: string) => {
  const recipeFound = await RecipeModel.findById(id);
  if (!recipeFound) throw new Error("Recipe not found");

  if (recipeFound.image) {
    await cloudinary.uploader.destroy(recipeFound.image.public_id);
  }

  await UserModel.updateMany({ recipes: new Types.ObjectId(id) }, { $pull: { recipes: new Types.ObjectId(id) } })

  const recipe = await RecipeModel.findByIdAndDelete(id);

  return recipe;
};

export const updateRecipe = async (
  id: string,
  { title, description, image, instructions, ingredients, category, prepTime, cookTime, servings }: ICreateRecipe
) => {
  const recipeFound = await RecipeModel.findById(id);
  if (!recipeFound) throw new Error("Recipe not found");

  let newRecipe: Partial<IUpdateRecipe> = {
    title,
    description,
    instructions,
    ingredients,
    category,
    prepTime,
    cookTime,
    servings
  };

  if (recipeFound.image && recipeFound.image.public_id) {
    await cloudinary.uploader.destroy(recipeFound.image.public_id);

    const newImage = await cloudinary.uploader.upload(image, {
      folder: "recipes",
    });

    newRecipe.image = {
      public_id: newImage.public_id,
      url: newImage.url,
    };
  }

  const updatedRecipe = await RecipeModel.findByIdAndUpdate(id, newRecipe, {
    new: true,
  });

  return updatedRecipe;
};
