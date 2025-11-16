import type { Handler } from "express";
import { verifyJWT } from "../../lib/jwt.js";

const authenticate: Handler = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const verification = verifyJWT(token);

  if (!verification.success) {
    return res.status(401).json({
      error: "Unauthorized",
      reason: verification.reason,
    });
  }

  req.user = { id: verification.userId };
  next();
};

export default authenticate;
