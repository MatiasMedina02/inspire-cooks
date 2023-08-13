"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const user_controller_1 = require("../controllers/user.controller");
router.get("/", user_controller_1.getAllUsersController);
router.post("/register", user_controller_1.registerUserController);
router.post("/login", user_controller_1.loginUserController);
exports.default = router;
