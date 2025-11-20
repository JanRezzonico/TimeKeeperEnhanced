import type { RequestHandler } from "express";
import { assert } from "../../../lib/assert.js";

const post: RequestHandler = async (req, res) => {
  assert(req.user, req);
  throw new Error("Not implemented");
};

export default post;
