import type { Handler } from "express";
import { verifyJWT } from "../../lib/jwt.js";
import db from "../../lib/db.js";
import serializeUser from "../../util/serializers/serializeUser.js";

const authenticate: Handler = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const verification = verifyJWT(token);

  if (!verification.success) {
    return res.status(401).json({
      error: "Unauthorized",
      reason: verification.reason,
    });
  }

  const id = verification.userId;

  const user = await db.user.findUnique({ where: { id } });

  if (!user) {
    return res.status(401).json({
      error: "Unauthorized",
      reason: "user_not_found",
    });
  }

  req.user = serializeUser(user);
  next();
};

export default authenticate;
