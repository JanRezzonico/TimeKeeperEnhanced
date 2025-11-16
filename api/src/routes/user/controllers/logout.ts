import type { RequestHandler } from "express";
import cookieNames from "../../../lib/cookieNames.js";

const logout: RequestHandler = async (req, res) => {
  res.clearCookie(cookieNames.authJWT);
  res.sendStatus(204);
};

export default logout;
