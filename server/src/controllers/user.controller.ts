import { RequestHandler } from "express"
import { loginUser, registerUser } from "../services/user"
import UserModel from "../models/User";

export const getAllUsersController: RequestHandler = async (req, res) => {
	try {
		const response = await UserModel.find({});
		res.status(200).json(response)
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
}

export const registerUserController: RequestHandler = async (req, res) => {
	try {
		const response = await registerUser(req.body);
		res.status(201).json(response);
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
}

export const loginUserController: RequestHandler = async (req, res) => {
	try {
		const response = await loginUser(req.body);
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ error: (error as Error).message });
	}
}
