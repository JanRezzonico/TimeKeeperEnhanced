import type { RequestHandler } from "express";
import { assert } from "../../../lib/assert.js";
import db from "../../../lib/db.js";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import dotenv from "../../../lib/dotenv.js";

const requestVerifyEmail: RequestHandler = async (req, res) => {
  assert(req.user, req);

  const { email, emailVerified } = req.user;

  if (emailVerified) {
    return res.status(400).json({ error: "Email is already verified" });
  }

  const rawToken = crypto.randomBytes(32).toString("hex");

  const tokenHash = bcrypt.hashSync(rawToken, 10);

  await db.verificationToken.deleteMany({
    where: { userId: req.user.id, type: "EMAIL_VERIFICATION" },
  });

  await db.verificationToken.create({
    data: {
      tokenHash,
      type: "EMAIL_VERIFICATION",
      userId: req.user.id,
      expiresAt: new Date(
        Date.now() + dotenv.EMAIL_VERIFICATION_TTL_MINS * 60 * 1000
      ),
    },
  });

  //TODO send email with verification link containing rawToken and email as query params
  // e.g., https://thisapi.example.com/auth/verify-email/confirm?token=rawToken&email=user.email@example.com
  console.log(
    `Email verification link: http://localhost:3000/auth/verify-email/confirm?token=${rawToken}&email=${encodeURIComponent(
      email
    )}`
  );

  return res.sendStatus(204);
};

export default requestVerifyEmail;
