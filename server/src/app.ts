import express from "express"
import morgan from "morgan"
import cors from "cors"

import userRouter from "./routes/user.routes"
import recipeRouter from "./routes/recipe.routes"
import commentRouter from "./routes/comment.routes"

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }))

// Routes
app.use("/users", userRouter);
app.use("/recipes", recipeRouter);
app.use("/comments", commentRouter);

export default app