import z from "zod";
import {
  localeSchema,
  passwordSchema,
  scheduleSchema,
  themeSchema,
  timezoneSchema,
} from "../../../lib/zodReusables.js";

const postBodySchema = z.object({
  email: z.email(),
  password: passwordSchema,
  name: z.string().min(1).max(64),
  theme: themeSchema,
  timezone: timezoneSchema,
  startedAt: z.coerce.date(),
  locale: localeSchema,
  schedule: scheduleSchema,
});

export default postBodySchema;
export type PostBodyType = z.infer<typeof postBodySchema>;
