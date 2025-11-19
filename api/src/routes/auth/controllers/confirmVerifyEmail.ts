import type { RequestHandler } from "express";
import type { ConfirmVerifyEmailQuerySchema } from "../schemas/confirmVerifyEmailQuerySchema.js";
import db from "../../../lib/db.js";
import bcrypt from "bcryptjs";

const confirmVerifyEmail: RequestHandler = async (req, res) => {
  const { email, token } = req.parsedQuery as ConfirmVerifyEmailQuerySchema;

  const user = await db.user.findUnique({ where: { email } });
  if (!user) return res.sendStatus(400);

  const verificationRecord = await db.verificationToken.findFirst({
    where: {
      userId: user.id,
      type: "EMAIL_VERIFICATION",
      expiresAt: { gt: new Date() },
    },
    select: { tokenHash: true },
  });

  if (!verificationRecord) return res.sendStatus(400);

  const tokenMatch = bcrypt.compareSync(token, verificationRecord.tokenHash);
  if (!tokenMatch) return res.sendStatus(400);

  await db.user.update({
    where: { id: user.id },
    data: { emailVerified: true },
  });

  await db.verificationToken.deleteMany({
    where: { userId: user.id, type: "EMAIL_VERIFICATION" },
  });

  return res.sendStatus(204);
};

export default confirmVerifyEmail;
