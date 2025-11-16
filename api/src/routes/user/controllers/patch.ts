import type { RequestHandler } from "express";
import { assert } from "../../../lib/assert.js";

const patch: RequestHandler = async (req, res) => {
  assert(req.user, req);
  throw new Error("Not implemented");
};

export default patch;
