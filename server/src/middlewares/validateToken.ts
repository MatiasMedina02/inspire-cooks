import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { Payload } from "../types"

interface RequestWithUserId extends Request {
	userId?: string
}

const JWT_SECRET = process.env.JWT_SECRET || "jsiow82ka";

export const validateToken = (req: RequestWithUserId, res: Response, next: NextFunction) => {
	const token = req.header("token");
	if(!token) return res.status(400).json({ error: "Access denied" });

	try {
		const payload = jwt.verify(token, JWT_SECRET) as Payload;
		req.userId = payload._id
		next();
	} catch (error) {
		res.status(400).json({ error: "Invalid token" });
	}
}