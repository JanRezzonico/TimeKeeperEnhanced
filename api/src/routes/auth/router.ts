import { Router } from "express";
import login from "./controllers/login.js";
import logout from "./controllers/logout.js";
import parseBody from "../_middlewares/parseBody.js";
import loginBodySchema from "./schemas/loginBodySchema.js";
import authenticate from "../_middlewares/authenticate.js";
import requestVerifyEmail from "./controllers/requestVerifyEmail.js";
import confirmVerifyEmailParamsSchema from "./schemas/confirmVerifyEmailQuerySchema.js";
import confirmVerifyEmail from "./controllers/confirmVerifyEmail.js";
import parseQuery from "../_middlewares/parseQuery.js";

const authRouter = Router();

authRouter.post("/login", [parseBody(loginBodySchema)], login);
authRouter.post("/logout", [], logout);

/**
 * User must be authenticated to request email verification
 * as the information is inferred from the authenticated user.
 */
authRouter.post("/verify-email", [authenticate], requestVerifyEmail);

/**
 * User does not need to be authenticated to confirm email verification
 * as he should provide email and token in the request body, which is sufficient.
 */
authRouter.get(
  "/verify-email/confirm",
  [parseQuery(confirmVerifyEmailParamsSchema)],
  confirmVerifyEmail
);

export default authRouter;
