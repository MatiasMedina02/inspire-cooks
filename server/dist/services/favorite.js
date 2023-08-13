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
exports.removeFavorite = exports.addFavorite = void 0;
const Recipe_1 = __importDefault(require("../models/Recipe"));
const User_1 = __importDefault(require("../models/User"));
const addFavorite = (idRecipe, idUser) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeFound = yield Recipe_1.default.findById(idRecipe);
    if (!recipeFound)
        throw new Error("Recipe not found");
    const userFound = yield User_1.default.findById(idUser);
    if (!userFound)
        throw new Error("Author not found");
    userFound.favorites.push(recipeFound._id);
    const user = yield userFound.save();
    return user;
});
exports.addFavorite = addFavorite;
const removeFavorite = (idRecipe, idUser) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeFound = yield Recipe_1.default.findById(idRecipe);
    if (!recipeFound)
        throw new Error("Recipe not found");
    const userFound = yield User_1.default.findById(idUser);
    if (!userFound)
        throw new Error("Author not found");
    yield User_1.default.findByIdAndUpdate(idUser, { $pull: { favorites: idRecipe } });
    const userUpdated = yield User_1.default.findById(idUser);
    return userUpdated;
});
exports.removeFavorite = removeFavorite;
