import "express";
import type { Session, User } from "../../generated/prisma/client.ts";
import type { SerializedUser } from "../serialized/SerializedUser.ts";

declare module "express-serve-static-core" {
  interface Request {
    user?: SerializedUser;
    parsedQuery?: Record<string, any>;
    session?: Session; // Only in /session routes
  }
}
