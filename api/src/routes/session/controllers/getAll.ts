import type { RequestHandler } from "express";
import { assert } from "../../../lib/assert.js";
import db from "../../../lib/db.js";

const getAll: RequestHandler = async (req, res) => {
  assert(req.user, req);
  const { id: userId } = req.user;

  // TODO: eventually implement pagination, filtering, etc. with appropriate query parameters
  // and a schema to validate them
  const sessions = await db.session.findMany({
    where: {
      userId,
    },
  });

  res.status(200).json(sessions);
};

export default getAll;
