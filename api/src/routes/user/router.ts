import { Router } from "express";
import get from "./controllers/get.js";
import post from "./controllers/post.js";
import patch from "./controllers/patch.js";
import del from "./controllers/del.js";
import authenticate from "../_middlewares/authenticate.js";
import parseBody from "../_middlewares/parseBody.js";
import postBodySchema from "./schemas/postBodySchema.js";
import patchBodySchema from "./schemas/patchBodySchema.js";

const userRouter = Router();

userRouter.get("/", [authenticate], get);
userRouter.post("/", [parseBody(postBodySchema)], post);
userRouter.patch("/", [authenticate, parseBody(patchBodySchema)], patch);
userRouter.delete("/", [authenticate], del);

export default userRouter;
