import jwt from "jsonwebtoken";
import dotenv from "./dotenv.js";

const signJWT = (userId: string) => {
  const token = jwt.sign({}, dotenv.JWT_SECRET, {
    expiresIn: dotenv.JWT_EXPIRATION_SECONDS,
    subject: userId,
  });
  return token;
};

type VerificationSuccess = {
  success: true;
  userId: string;
};

type VerificationFailure = {
  success: false;
  reason: "expired" | "invalid" | "no_token";
};

const verifyJWT = (
  token?: string
): VerificationSuccess | VerificationFailure => {
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
