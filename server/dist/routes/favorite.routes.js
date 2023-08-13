"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const favorite_controller_1 = require("../controllers/favorite.controller");
router.post("/", favorite_controller_1.addFavoriteController);
router.delete("/", favorite_controller_1.removeFavoriteController);
exports.default = router;
