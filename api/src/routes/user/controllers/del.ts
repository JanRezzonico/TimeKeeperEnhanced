import type { RequestHandler } from "express";
import db from "../../../lib/db.js";
import { assert } from "../../../lib/assert.js";

const del: RequestHandler = async (req, res) => {
  assert(req.user, req);

  await db.user.delete({
    where: { id: req.user.id },
  });

  res.sendStatus(204);
};

export default del;
