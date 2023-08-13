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
exports.postComment = void 0;
const Recipe_1 = __importDefault(require("../models/Recipe"));
const Comment_1 = __importDefault(require("../models/Comment"));
const User_1 = __importDefault(require("../models/User"));
const postComment = (idRecipe, { text, author }) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeFound = yield Recipe_1.default.findById(idRecipe);
    if (!recipeFound)
        throw new Error("Recipe not found");
    const authorFound = yield User_1.default.findById(author);
    if (!authorFound)
        throw new Error("Author not found");
    const comment = yield Comment_1.default.create({
        text,
        author: authorFound
    });
    recipeFound.comments.push(comment);
    yield recipeFound.save();
    return comment;
});
exports.postComment = postComment;
