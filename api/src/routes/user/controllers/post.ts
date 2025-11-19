import type { RequestHandler } from "express";
import type { PostBodyType } from "../schemas/postBodySchema.js";
import db from "../../../lib/db.js";
import { isEmailTaken } from "../../../lib/dbReusables.js";
import { setAuthCookie } from "../../../lib/cookieHelper.js";
import bcrypt from "bcryptjs";

const post: RequestHandler = async (req, res) => {
  const {
    email,
    password,
    name,
    theme,
    timezone,
    startedAt,
    locale,
    schedule,
  } = req.body as PostBodyType;

  if (await isEmailTaken(email)) {
    return res.status(409).json({ error: "Email is already taken" });
  }

  console.log("Creating user with email:", email);

  const passwordHash = bcrypt.hashSync(password, 10);

  const { id } = await db.user.create({
    data: {
      email,
      password: passwordHash,
      name,
      theme,
      timezone,
      startedAt,
      locale,
      schedule,
    },
    select: {
      id: true,
    },
  });

  console.log("User created with ID:", id);

  setAuthCookie(res, id);

  console.log("Auth cookie set for user ID:", id);

  return res.sendStatus(201);
};

export default post;
