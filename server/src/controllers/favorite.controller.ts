import { RequestHandler } from "express";
import { addFavorite, removeFavorite } from "../services/favorite";

export const addFavoriteController: RequestHandler = async (req, res) => {
	const { idRecipe, idUser } = req.body;
	try {
		const response = await addFavorite(idRecipe, idUser);
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
}

export const removeFavoriteController: RequestHandler = async (req, res) => {
	const { idRecipe, idUser } = req.body;
	try {
		const response = await removeFavorite(idRecipe, idUser);
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
}