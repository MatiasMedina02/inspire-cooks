import { Router } from "express";
const router = Router();

import { addFavoriteController, getAllFavoritesController, removeFavoriteController } from "../controllers/favorite.controller";

router.get("/:idUser", getAllFavoritesController);

router.post("/", addFavoriteController);

router.delete("/", removeFavoriteController);

export default router