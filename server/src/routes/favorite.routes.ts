import { Router } from "express";
const router = Router();

import { addFavoriteController, removeFavoriteController } from "../controllers/favorite.controller";

router.post("/", addFavoriteController);

router.delete("/", removeFavoriteController);

export default router