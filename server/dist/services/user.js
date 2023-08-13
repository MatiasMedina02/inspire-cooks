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
exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const JWT_SECRET = process.env.JWT_SECRET || "jsiow82ka";
const registerUser = ({ firstName, lastName, email, password, image }) => __awaiter(void 0, void 0, void 0, function* () {
    if (password) {
        const userExists = yield User_1.default.findOne({ email });
        if (userExists)
            throw new Error("User already exists");
        const passwordHash = yield bcryptjs_1.default.hash(password, 10);
        yield User_1.default.create({
            firstName,
            lastName,
            email,
            password: passwordHash,
        });
    }
    else {
        const userExists = yield User_1.default.findOne({ email });
        if (userExists)
            return userExists;
        const userImage = yield cloudinary_1.default.uploader.upload(image, {
            folder: "users",
        });
        const userData = yield User_1.default.create({
            firstName,
            lastName,
            email,
            image: { public_id: userImage.public_id, url: userImage.url },
        });
        return userData;
    }
    return "User created successfully";
});
exports.registerUser = registerUser;
const loginUser = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield User_1.default.findOne({ email });
    if (!userExists)
        throw new Error("Email or Password is wrong");
    const verifyPassword = yield bcryptjs_1.default.compare(password, userExists.password);
    if (!verifyPassword)
        throw new Error("Incorrect password");
    const token = jsonwebtoken_1.default.sign({ _id: userExists._id }, JWT_SECRET, {
        expiresIn: "2h",
    });
    return { token, user: userExists };
});
exports.loginUser = loginUser;
