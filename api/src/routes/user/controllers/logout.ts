import type { RequestHandler } from "express";
import cookieNames from "../../../lib/cookieNames.js";

const logout: RequestHandler = async (_req, res) => {
  res.clearCookie(cookieNames.authJWT);
  return res.sendStatus(204);
};

export default logout;
