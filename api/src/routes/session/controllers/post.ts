import type { RequestHandler } from "express";
import { assert } from "../../../lib/assert.js";
import db from "../../../lib/db.js";
import type { PostBodyType } from "../schemas/postBodySchema.js";
import causesSessionOverlap from "../util/causesSessionOverlap.js";
import splitSessionAtMidnight from "../util/splitSessionAtMidnight.js";

const post: RequestHandler = async (req, res) => {
  assert(req.user, req);
  const { id: userId } = req.user;
  const { start, end, note } = req.body as PostBodyType;

  // Avoid ever having start > end
  if (end && start > end) {
    return res
      .status(400)
      .json({ error: "End date must be after start date." });
  }

  if (await causesSessionOverlap(userId, start, end)) {
    return res
      .status(400)
      .json({ error: "Session overlaps with an existing session." });
  }

  const records = splitSessionAtMidnight({ start, end, note });

  await db.session.createMany({
    data: records.map((record) => ({
      userId,
      start: record.start,
      end: record.end,
      note: record.note,
    })),
  });

  res.sendStatus(201);
};

export default post;
