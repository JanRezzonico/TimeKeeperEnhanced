import type { User } from "../../generated/prisma/client.js";
import type { SerializedUser } from "../../types/serialized/SerializedUser.js";

const serializeUser = (user: User): SerializedUser => {
  let schedule;
  try {
    schedule = JSON.parse(user.schedule as string);
  } catch {
    schedule = null;
  }

  return Object.freeze({
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    theme: user.theme,
    timezone: user.timezone,
    startedAt: user.startedAt,
    locale: user.locale,
    schedule: schedule,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
};

export default serializeUser;
