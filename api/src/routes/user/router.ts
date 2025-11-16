import { Router } from "express";
import get from "./controllers/get.js";
import post from "./controllers/post.js";
import patch from "./controllers/patch.js";
import del from "./controllers/del.js";
import login from "./controllers/login.js";
import logout from "./controllers/logout.js";
import authenticate from "../middlewares/authenticate.js";

const userRouter = Router();

userRouter.get("/", [authenticate], get);
userRouter.post("/", [], post);
userRouter.patch("/", [authenticate], patch);
userRouter.delete("/", [authenticate], del);

userRouter.post("/login", [], login);
userRouter.post("/logout", [], logout);

export default userRouter;
