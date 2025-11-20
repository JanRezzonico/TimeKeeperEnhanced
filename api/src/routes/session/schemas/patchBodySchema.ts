import z from "zod";

const patchBodySchema = z.object({
  start: z.coerce.date().optional(),
  end: z.coerce.date().optional(),
  note: z.string().max(512).optional(),
});

export default patchBodySchema;
export type PatchBodyType = z.infer<typeof patchBodySchema>;
