import { isFuture } from "date-fns";
import z from "zod";

const notFuture = (date: Date | null | undefined) => !date || !isFuture(date);

const patchBodySchema = z.object({
  start: z.coerce.date().optional().refine(notFuture, {
    message: "Start date cannot be in the future.",
  }),
  end: z.coerce.date().nullable().optional().refine(notFuture, {
    message: "End date cannot be in the future.",
  }),
  note: z.string().max(512).optional(),
});

export default patchBodySchema;
export type PatchBodyType = z.infer<typeof patchBodySchema>;
