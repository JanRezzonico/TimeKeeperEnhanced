import type { RequestHandler } from "express";
import z from "zod";
import db from "../../../lib/db.js";
import bcrypt from "bcrypt";
import { signJWT } from "../../../lib/jwt.js";
import cookieNames from "../../../lib/cookieNames.js";
import dotenv from "../../../lib/dotenv.js";

const login: RequestHandler = async (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: "Invalid request body" });

  const { email, password } = parsed.data;

  const user = await db.user.findUnique({ where: { email } });
  if (!user) return res.sendStatus(401);

  const pwdMatch = bcrypt.compareSync(password, user.password);
  if (!pwdMatch) return res.sendStatus(401);

  const token = signJWT(user.id);

  res.cookie(cookieNames.authJWT, token, {
    httpOnly: true,
    secure: dotenv.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: dotenv.JWT_EXPIRATION_SECONDS * 1000,
  });

  return res.sendStatus(204);
};

const schema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export default login;
