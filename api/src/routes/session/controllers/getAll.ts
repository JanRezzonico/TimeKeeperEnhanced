import type { RequestHandler } from "express";
import { assert } from "../../../lib/assert.js";

// TODO: eventually implement pagination, filtering, etc. with appropriate query parameters
// and a schema to validate them
const getAll: RequestHandler = async (req, res) => {
  assert(req.user, req);
  throw new Error("Not implemented");
};

export default getAll;
