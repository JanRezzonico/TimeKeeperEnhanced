import { Router } from "express";
import get from "./controllers/get.js";
import post from "./controllers/post.js";
import patch from "./controllers/patch.js";
import del from "./controllers/del.js";
import login from "./controllers/login.js";
import logout from "./controllers/logout.js";
import authenticate from "../middlewares/authenticate.js";
import parseBody from "../middlewares/parseBody.js";
import postBodySchema from "./schemas/postBodySchema.js";
import loginBodySchema from "./schemas/loginBodySchema.js";

const userRouter = Router();

userRouter.get("/", [authenticate], get);
userRouter.post("/", [parseBody(postBodySchema)], post);
userRouter.patch("/", [authenticate, parseBody(postBodySchema)], patch);
userRouter.delete("/", [authenticate], del);

userRouter.post("/login", [parseBody(loginBodySchema)], login);
userRouter.post("/logout", [], logout);

export default userRouter;
