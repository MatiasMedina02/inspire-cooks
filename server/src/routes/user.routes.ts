import { Router } from "express"
const router = Router();

import { getAllUsersController, loginUserController, registerUserController } from "../controllers/user.controller";

router.get("/", getAllUsersController);

router.post("/register", registerUserController);

router.post("/login", loginUserController);

export default router