import jwt from "jsonwebtoken";
import dotenv from "./dotenv.js";

const signJWT = (userId: string) => {
  const expiresAt =
    Math.floor(Date.now() / 1000) + dotenv.JWT_EXPIRATION_SECONDS;
  const payload = { sub: userId, exp: expiresAt };
  const token = jwt.sign(payload, dotenv.JWT_SECRET, {
    expiresIn: dotenv.JWT_EXPIRATION_SECONDS,
  });
  return token;
};

const verifyJWT = (
  token?: string
): {
  success: boolean;
  reason?: "expired" | "invalid" | "no_token";
  userId?: string;
} => {
  if (!token) return { success: false, reason: "no_token" };
  try {
    const decoded = jwt.verify(token, dotenv.JWT_SECRET) as { sub: string };
    return { success: true, userId: decoded.sub };
  } catch (err: unknown) {
    let error = err as jwt.JsonWebTokenError;
    if (error.name === "TokenExpiredError") {
      return { success: false, reason: "expired" };
    } else {
      return { success: false, reason: "invalid" };
    }
  }
};

export { signJWT, verifyJWT };
