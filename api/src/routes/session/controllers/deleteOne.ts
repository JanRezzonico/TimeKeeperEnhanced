import type { RequestHandler } from "express";
import { assert } from "../../../lib/assert.js";

const deleteOne: RequestHandler<{ id: string }> = async (req, res) => {
  assert(req.user, req);
  const { id } = req.params;
  throw new Error("Not implemented");
};

export default deleteOne;
