import { RequestHandler } from "express";
import { deleteRecipe, getAllRecipes, getAllUserRecipes, getRecipeById, postRecipe, updateRecipe } from "../services/recipe";

export const getAllRecipesController: RequestHandler = async (req, res) => {
	const title = req.query.title as string;
	try {
		const response = await getAllRecipes(title);
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
}

export const getAllUserRecipesController: RequestHandler = async (req, res) => {
	const { idUser } = req.params;
	try {
		const response = await getAllUserRecipes(idUser);
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
}

export const getRecipeByIdController: RequestHandler = async (req, res) => {
	const { id } = req.params;
	try {
		const response = await getRecipeById(id);
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
}

export const postRecipeController: RequestHandler = async (req, res) => {
	const { recipe, userId } = req.body;
	
	try {
		const response = await postRecipe(recipe, userId);
		res.status(201).json(response);
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
}

export const deleteRecipeController: RequestHandler = async (req, res) => {
	const { id } = req.params;
	
	try {
		const response = await deleteRecipe(id);
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
}

export const updateRecipeController: RequestHandler = async (req, res) => {
	const { id } = req.params;
	
	try {
		const response = await updateRecipe(id, req.body);
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
}