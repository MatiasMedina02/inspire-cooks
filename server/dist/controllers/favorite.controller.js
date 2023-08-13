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
exports.removeFavoriteController = exports.addFavoriteController = void 0;
const favorite_1 = require("../services/favorite");
const addFavoriteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idRecipe, idUser } = req.body;
    try {
        const response = yield (0, favorite_1.addFavorite)(idRecipe, idUser);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.addFavoriteController = addFavoriteController;
const removeFavoriteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idRecipe, idUser } = req.body;
    try {
        const response = yield (0, favorite_1.removeFavorite)(idRecipe, idUser);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.removeFavoriteController = removeFavoriteController;
