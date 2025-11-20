import z from "zod";

const postBodySchema = z.object({
  start: z.coerce.date(),
  end: z.coerce.date().nullable(),
  note: z.string().max(512).default(""),
});

export default postBodySchema;
export type PostBodyType = z.infer<typeof postBodySchema>;
