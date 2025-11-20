import type { RequestHandler } from "express";
import type { PatchBodyType } from "../schemas/patchBodySchema.js";
import type { Session } from "../../../generated/prisma/client.js";
import db from "../../../lib/db.js";

const patchOne: RequestHandler<{ id: string }> = async (req, res) => {
  const { start, end, note } = req.body as PatchBodyType;
  const { id } = req.session as Session;

  await db.session.update({
    where: {
      id,
    },
    data: {
      ...(start && { start }),
      ...(end !== undefined && { end }), // allow null to be set
      ...(note && { note }),
    },
  });

  res.sendStatus(204);
};

export default patchOne;
