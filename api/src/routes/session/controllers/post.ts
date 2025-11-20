import type { RequestHandler } from "express";
import { assert } from "../../../lib/assert.js";
import db from "../../../lib/db.js";
import type { PostBodyType } from "../schemas/postBodySchema.js";

const post: RequestHandler = async (req, res) => {
  assert(req.user, req);
  const { id: userId } = req.user;
  const { start, end, note } = req.body as PostBodyType;

  await db.session.create({
    data: {
      userId,
      start,
      end,
      note,
    },
  });

  res.sendStatus(201);
};

export default post;
