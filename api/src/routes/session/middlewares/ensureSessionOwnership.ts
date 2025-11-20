import type { RequestHandler } from "express";
import { assert } from "../../../lib/assert.js";
import db from "../../../lib/db.js";

const ensureSessionOwnership: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  assert(req.user, req);
  const { id: userId } = req.user;
  const { id: sessionId } = req.params;

  const session = await db.session.findUnique({
    where: {
      id: sessionId,
      userId: userId,
    },
  });

  if (!session) {
    // We dont care whether the session doesnt exist or the user doesnt own it, 404 for either case
    return res.sendStatus(404);
  }

  req.session = session;

  next();
};

export default ensureSessionOwnership;
