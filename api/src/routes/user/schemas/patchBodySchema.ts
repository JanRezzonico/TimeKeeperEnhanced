import z from "zod";
import {
  localeSchema,
  passwordSchema,
  scheduleSchema,
  themeSchema,
  timezoneSchema,
} from "../../../lib/zodReusables.js";

const patchBodySchema = z.object({
  email: z.email().optional(),
  password: passwordSchema.optional(),
  name: z.string().min(1).max(64).optional(),
  theme: themeSchema.optional(),
  timezone: timezoneSchema.optional(),
  startedAt: z.coerce.date().optional(),
  locale: localeSchema.optional(),
  schedule: scheduleSchema.optional(),
});

export default patchBodySchema;
export type PatchBodyType = z.infer<typeof patchBodySchema>;
