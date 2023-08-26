import { Router } from "express"
const router = Router();

import { deleteRecipeController, getAllRecipesController, getAllUserRecipesController, getRecipeByIdController, postRecipeController, updateRecipeController } from "../controllers/recipe.controller";

router.get("/", getAllRecipesController);

router.get("/:id", getRecipeByIdController);

router.get("/created/:idUser", getAllUserRecipesController)

router.post("/", postRecipeController);

router.delete("/:id", deleteRecipeController);

router.put("/:id", updateRecipeController);

export default router