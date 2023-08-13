"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const recipe_routes_1 = __importDefault(require("./routes/recipe.routes"));
const comment_routes_1 = __importDefault(require("./routes/comment.routes"));
const favorite_routes_1 = __importDefault(require("./routes/favorite.routes"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "100mb" }));
app.use(express_1.default.urlencoded({ limit: "100mb", extended: true }));
// Routes
app.use("/users", user_routes_1.default);
app.use("/recipes", recipe_routes_1.default);
app.use("/comments", comment_routes_1.default);
app.use("/favorites", favorite_routes_1.default);
app.get("/", (req, res) => {
    res.send("Hola Mundo");
});
exports.default = app;
