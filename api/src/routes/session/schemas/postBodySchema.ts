import { isFuture } from "date-fns";
import z from "zod";

const notFuture = (date: Date | null | undefined) => !date || !isFuture(date);

const postBodySchema = z.object({
  start: z.coerce.date().refine(notFuture, {
    message: "Start date cannot be in the future.",
  }),
  end: z.coerce.date().nullable().refine(notFuture, {
    message: "End date cannot be in the future.",
  }),
  note: z.string().max(512).default(""),
});

export default postBodySchema;
export type PostBodyType = z.infer<typeof postBodySchema>;
