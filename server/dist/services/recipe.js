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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRecipe = exports.deleteRecipe = exports.postRecipe = exports.getRecipeById = exports.getAllRecipes = void 0;
const Recipe_1 = __importDefault(require("../models/Recipe"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const User_1 = __importDefault(require("../models/User"));
const mongoose_1 = require("mongoose");
const Comment_1 = __importDefault(require("../models/Comment"));
const getAllRecipes = (title) => __awaiter(void 0, void 0, void 0, function* () {
    if (title) {
        const searchRecipes = yield Recipe_1.default.find({ title: { $regex: `^${title}`, $options: "i" } }).sort({ createdAt: -1 });
        if (!searchRecipes.length)
            throw new Error("Recipes not found");
        return searchRecipes;
    }
    const allRecipes = yield Recipe_1.default.find({}).sort({ createdAt: -1 });
    return allRecipes;
});
exports.getAllRecipes = getAllRecipes;
const getRecipeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeFound = yield Recipe_1.default.findById(id).populate("author").exec();
    if (!recipeFound)
        throw new Error("Recipe not found");
    const comments = yield Comment_1.default.find({ _id: { $in: recipeFound.comments } }).sort({ createdAt: -1 }).populate("author").exec();
    recipeFound.comments = comments;
    return recipeFound;
});
exports.getRecipeById = getRecipeById;
const postRecipe = ({ title, description, image, instructions, ingredients, category, prepTime, cookTime, servings }, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeExists = yield Recipe_1.default.findOne({ title });
    if (recipeExists)
        throw new Error("Recipe already exists");
    const user = yield User_1.default.findById(userId);
    if (!user)
        throw new Error("User not found");
    const recipeImage = yield cloudinary_1.default.uploader.upload(image, {
        folder: "recipes",
    });
    const newRecipe = yield Recipe_1.default.create({
        title,
        description,
        image: { public_id: recipeImage.public_id, url: recipeImage.secure_url },
        ingredients,
        instructions,
        category,
        prepTime,
        cookTime,
        totalTime: prepTime + cookTime,
        servings,
        author: user._id,
    });
    user.recipes.push(newRecipe._id);
    yield user.save();
    return "Recipe created successfully";
});
exports.postRecipe = postRecipe;
const deleteRecipe = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeFound = yield Recipe_1.default.findById(id);
    if (!recipeFound)
        throw new Error("Recipe not found");
    if (recipeFound.image) {
        yield cloudinary_1.default.uploader.destroy(recipeFound.image.public_id);
    }
    yield User_1.default.updateMany({ recipes: new mongoose_1.Types.ObjectId(id) }, { $pull: { recipes: new mongoose_1.Types.ObjectId(id) } });
    const recipe = yield Recipe_1.default.findByIdAndDelete(id);
    return recipe;
});
exports.deleteRecipe = deleteRecipe;
const updateRecipe = (id, { title, description, image, instructions, ingredients, category, prepTime, cookTime, servings }) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeFound = yield Recipe_1.default.findById(id);
    if (!recipeFound)
        throw new Error("Recipe not found");
    let newRecipe = {
        title,
        description,
        instructions,
        ingredients,
        category,
        prepTime,
        cookTime,
        servings
    };
    if (recipeFound.image && recipeFound.image.public_id) {
        yield cloudinary_1.default.uploader.destroy(recipeFound.image.public_id);
        const newImage = yield cloudinary_1.default.uploader.upload(image, {
            folder: "recipes",
        });
        newRecipe.image = {
            public_id: newImage.public_id,
            url: newImage.url,
        };
    }
    const updatedRecipe = yield Recipe_1.default.findByIdAndUpdate(id, newRecipe, {
        new: true,
    });
    return updatedRecipe;
});
exports.updateRecipe = updateRecipe;
