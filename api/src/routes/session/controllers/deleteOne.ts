import type { RequestHandler } from "express";
import type { Session } from "../../../generated/prisma/client.js";
import db from "../../../lib/db.js";

const deleteOne: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req.session as Session;
  await db.session.delete({
    where: {
      id,
    },
  });
  res.sendStatus(204);
};

export default deleteOne;
