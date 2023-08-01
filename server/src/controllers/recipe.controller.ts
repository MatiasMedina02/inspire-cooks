import { RequestHandler } from "express";
import { deleteRecipe, getAllRecipes, getRecipeById, postRecipe, updateRecipe } from "../services/recipe";

export const getAllRecipesController: RequestHandler = async (req, res) => {
	try {
		const response = await getAllRecipes();
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
	const { recipe } = req.body;
	
	try {
		const response = await updateRecipe(id, recipe);
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
}