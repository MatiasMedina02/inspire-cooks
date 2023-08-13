"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const recipe_controller_1 = require("../controllers/recipe.controller");
router.get("/", recipe_controller_1.getAllRecipesController);
router.get("/:id", recipe_controller_1.getRecipeByIdController);
router.post("/", recipe_controller_1.postRecipeController);
router.delete("/:id", recipe_controller_1.deleteRecipeController);
router.put("/:id", recipe_controller_1.updateRecipeController);
exports.default = router;