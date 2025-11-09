import { Router } from "express";
import get from "./controllers/get.js";

const userRouter = Router();

userRouter.get("/:id", get);

export default userRouter;