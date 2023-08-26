import RecipeModel from "../models/Recipe";
import UserModel from "../models/User";

export const getAllFavorites = async (idUser: string) => {
	const userFound = await UserModel.findById(idUser);
	if (!userFound) throw new Error("User not found");

	const favoriteRecipes = await RecipeModel.find({ _id: { $in: userFound.favorites } });
	return favoriteRecipes;
}

export const addFavorite = async (idRecipe: string, idUser: string) => {
	const recipeFound = await RecipeModel.findById(idRecipe);
  if (!recipeFound) throw new Error("Recipe not found");

	const userFound = await UserModel.findById(idUser);
  if (!userFound) throw new Error("Author not found");

	userFound.favorites.push(recipeFound._id);
	const user = await userFound.save();
	
	return user;
}

export const removeFavorite = async (idRecipe: string, idUser: string) => {
	const recipeFound = await RecipeModel.findById(idRecipe);
  if (!recipeFound) throw new Error("Recipe not found");

	const userFound = await UserModel.findById(idUser);
  if (!userFound) throw new Error("Author not found");

	await UserModel.findByIdAndUpdate(idUser, { $pull: { favorites: idRecipe } });

	const userUpdated = await UserModel.findById(idUser);
	
	return userUpdated;
}