"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRecipeController = exports.deleteRecipeController = exports.postRecipeController = exports.getRecipeByIdController = exports.getAllRecipesController = void 0;
const recipe_1 = require("../services/recipe");
const getAllRecipesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.query.title;
    try {
        const response = yield (0, recipe_1.getAllRecipes)(title);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getAllRecipesController = getAllRecipesController;
const getRecipeByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const response = yield (0, recipe_1.getRecipeById)(id);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getRecipeByIdController = getRecipeByIdController;
const postRecipeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { recipe, userId } = req.body;
    try {
        const response = yield (0, recipe_1.postRecipe)(recipe, userId);
        res.status(201).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.postRecipeController = postRecipeController;
const deleteRecipeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const response = yield (0, recipe_1.deleteRecipe)(id);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.deleteRecipeController = deleteRecipeController;
const updateRecipeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { recipe } = req.body;
    try {
        const response = yield (0, recipe_1.updateRecipe)(id, recipe);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updateRecipeController = updateRecipeController;
