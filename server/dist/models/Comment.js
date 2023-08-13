"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
}, {
    versionKey: false,
    timestamps: true
});
const CommentModel = (0, mongoose_1.model)("Comment", commentSchema);
exports.default = CommentModel;
