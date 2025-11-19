import { Router } from "express";
import login from "./controllers/login.js";
import logout from "./controllers/logout.js";
import parseBody from "../_middlewares/parseBody.js";
import loginBodySchema from "./schemas/loginBodySchema.js";

const authRouter = Router();

authRouter.post("/login", [parseBody(loginBodySchema)], login);
authRouter.post("/logout", [], logout);

export default authRouter;
