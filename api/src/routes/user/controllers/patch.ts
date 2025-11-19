import type { RequestHandler } from "express";
import { assert } from "../../../lib/assert.js";
import type { PatchBodyType } from "../schemas/patchBodySchema.js";
import { isEmailTaken } from "../../../lib/dbReusables.js";
import db from "../../../lib/db.js";
import bcrypt from "bcryptjs";

const patch: RequestHandler = async (req, res) => {
  assert(req.user, req);

  const {
    email,
    password,
    name,
    theme,
    timezone,
    startedAt,
    locale,
    schedule,
  } = req.body as PatchBodyType;

  if (email && email !== req.user.email) {
    // Wants email change
    if (await isEmailTaken(email)) {
      return res.status(409).json({ error: "Email is already taken" });
    }
  }

  let passwordHash;
  if (password) {
    passwordHash = bcrypt.hashSync(password, 10);
  }

  await db.user.update({
    where: { id: req.user.id },
    data: {
      ...(email && { email }),
      ...(passwordHash && { password: passwordHash }),
      ...(name && { name }),
      ...(theme && { theme }),
      ...(timezone && { timezone }),
      ...(startedAt && { startedAt }),
      ...(locale && { locale }),
      ...(schedule && { schedule }),
    },
  });

  return res.sendStatus(204);
};

export default patch;
