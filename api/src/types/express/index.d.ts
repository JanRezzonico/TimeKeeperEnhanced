import "express";
import type { User } from "../../generated/prisma/client.ts";
import type { SerializedUser } from "../serialized/SerializedUser.ts";

declare module "express-serve-static-core" {
  interface Request {
    user?: SerializedUser;
  }
}
