import { RequestHandler } from "express";
import { postComment } from "../services/comment";

export const postCommentController: RequestHandler = async (req, res) => {
	const { idRecipe } = req.params;
	const comment = req.body;

	try {
		const response = await postComment(idRecipe, comment);
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
}