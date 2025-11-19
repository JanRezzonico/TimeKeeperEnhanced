import type { Response } from "express";
import { signJWT } from "./jwt.js";
import cookieNames from "./cookieNames.js";
import dotenv from "./dotenv.js";

const setAuthCookie = (res: Response, userId: string): void => {
  const token = signJWT(userId);
  res.cookie(cookieNames.authJWT, token, {
    httpOnly: true,
    secure: dotenv.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: dotenv.JWT_EXPIRATION_SECONDS * 1000,
  });
};

const clearAuthCookie = (res: Response): void => {
  res.clearCookie(cookieNames.authJWT, {
    httpOnly: true,
    secure: dotenv.NODE_ENV === "production",
    sameSite: "lax",
  });
};

export { setAuthCookie, clearAuthCookie };
