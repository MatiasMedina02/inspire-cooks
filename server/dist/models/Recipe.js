"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const types_1 = require("../types");
const recipeSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    ingredients: {
        type: [Object],
        required: true
    },
    instructions: {
        type: [Object],
        required: true
    },
    category: {
        type: String,
        enum: Object.values(types_1.RecipeCategory),
        required: true
    },
    prepTime: {
        type: Number,
        required: true
    },
    cookTime: {
        type: Number,
        required: true
    },
    totalTime: {
        type: Number,
        required: true
    },
    servings: {
        type: Number,
        required: true
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Comment"
        }],
}, {
    versionKey: false,
    timestamps: true
});
const UserModel = (0, mongoose_1.model)("Recipe", recipeSchema);
exports.default = UserModel;
