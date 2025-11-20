import type { RequestHandler } from "express";
import type { Session } from "../../../generated/prisma/client.js";

const getOne: RequestHandler<{ id: string }> = async (req, res) => {
  return res.status(200).json(req.session as Session);
};

export default getOne;
