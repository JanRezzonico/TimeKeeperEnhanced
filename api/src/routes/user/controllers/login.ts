import type { RequestHandler } from "express";
import db from "../../../lib/db.js";
import bcrypt from "bcryptjs";
import { setAuthCookie } from "../../../lib/cookieHelper.js";
import type { LoginBodySchema } from "../schemas/loginBodySchema.js";

const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body as LoginBodySchema;

  const user = await db.user.findUnique({ where: { email } });
  if (!user) return res.sendStatus(401);

  const pwdMatch = bcrypt.compareSync(password, user.password);
  if (!pwdMatch) return res.sendStatus(401);

  setAuthCookie(res, user.id);

  return res.sendStatus(204);
};

export default login;
