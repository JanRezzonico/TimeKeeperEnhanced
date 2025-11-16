import type { RequestHandler } from "express";
import { assert } from "../../../lib/assert.js";

// const get:RequestHandler<{id:string}> = async (req, res) => {
//     const userId = req.params.id;
//     throw new Error("Not implemented");
// };

const get: RequestHandler = async (req, res) => {
  assert(req.user, req);
  return res.json(req.user);
};

export default get;
