"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "jsiow82ka";
const validateToken = (req, res, next) => {
    const token = req.header("token");
    if (!token)
        return res.status(400).json({ error: "Access denied" });
    try {
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.userId = payload._id;
        next();
    }
    catch (error) {
        res.status(400).json({ error: "Invalid token" });
    }
};
exports.validateToken = validateToken;
