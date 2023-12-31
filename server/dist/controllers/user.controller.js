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
exports.loginUserController = exports.registerUserController = exports.getAllUsersController = void 0;
const user_1 = require("../services/user");
const User_1 = __importDefault(require("../models/User"));
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield User_1.default.find({});
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getAllUsersController = getAllUsersController;
const registerUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, user_1.registerUser)(req.body);
        res.status(201).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.registerUserController = registerUserController;
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, user_1.loginUser)(req.body);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.loginUserController = loginUserController;
