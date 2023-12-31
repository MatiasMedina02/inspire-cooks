import { IComment } from "../types";
import RecipeModel from "../models/Recipe";
import CommentModel from "../models/Comment";
import UserModel from "../models/User";

export const postComment = async (idRecipe: string, { text, author }: IComment) => {
	const recipeFound = await RecipeModel.findById(idRecipe);
  if (!recipeFound) throw new Error("Recipe not found");

	const authorFound = await UserModel.findById(author);
  if (!authorFound) throw new Error("Author not found");

	const comment = await CommentModel.create({
		text,
		author: authorFound
	});

	recipeFound.comments.push(comment);
	await recipeFound.save();

	return comment;
}