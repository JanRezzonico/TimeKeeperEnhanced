import { Router } from "express";
import authenticate from "../_middlewares/authenticate.js";
import parseBody from "../_middlewares/parseBody.js";
import postBodySchema from "./schemas/postBodySchema.js";
import getAll from "./controllers/getAll.js";
import post from "./controllers/post.js";
import getOne from "./controllers/getOne.js";
import patchBodySchema from "./schemas/patchBodySchema.js";
import patchOne from "./controllers/patchOne.js";
import deleteOne from "./controllers/deleteOne.js";
import requireIdParam from "../_middlewares/requireIdParam.js";
import ensureSessionOwnership from "./middlewares/ensureSessionOwnership.js";

const sessionRouter = Router();

sessionRouter.get("/", [authenticate], getAll);
sessionRouter.get(
  "/:id",
  [authenticate, requireIdParam, ensureSessionOwnership],
  getOne
);
sessionRouter.post("/", [authenticate, parseBody(postBodySchema)], post);
sessionRouter.patch(
  "/:id",
  [
    authenticate,
    requireIdParam,
    ensureSessionOwnership,
    parseBody(patchBodySchema),
  ],
  patchOne
);
sessionRouter.delete(
  "/:id",
  [authenticate, requireIdParam, ensureSessionOwnership],
  deleteOne
);

export default sessionRouter;
