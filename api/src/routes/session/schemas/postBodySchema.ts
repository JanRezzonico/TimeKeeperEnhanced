import z from "zod";

const postBodySchema = z.object({
  start: z.coerce.date(),
  end: z.coerce.date().optional(),
  note: z.string().max(512).optional(),
});

export default postBodySchema;
export type PostBodyType = z.infer<typeof postBodySchema>;
