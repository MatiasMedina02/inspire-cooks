"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
    },
    image: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
            default: "https://img.freepik.com/premium-vector/flat-instagram-icons-notifications_619991-50.jpg"
        },
    },
    recipes: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Recipe"
        }],
    favorites: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Recipe"
        }],
}, {
    versionKey: false,
});
const UserModel = (0, mongoose_1.model)("User", userSchema);
exports.default = UserModel;
