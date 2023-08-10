import { Router } from "express";
const router = Router();

import { postCommentController } from "../controllers/comments.controller";

router.post("/:idRecipe", postCommentController);

export default router