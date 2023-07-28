import { Router } from "express"
const router = Router();

import { deleteRecipeController, getAllRecipesController, getRecipeByIdController, postRecipeController, updateRecipeController } from "../controllers/recipe.controller";

router.get("/", getAllRecipesController);

router.get("/:id", getRecipeByIdController);

router.post("/", postRecipeController);

router.delete("/:id", deleteRecipeController);

router.put("/:id", updateRecipeController);

export default router