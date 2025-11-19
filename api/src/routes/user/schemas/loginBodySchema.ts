import z from "zod";

const loginBodySchema = z.object({
  email: z.email(),
  password: z.string().min(1).max(256),
});

export default loginBodySchema;
export type LoginBodySchema = z.infer<typeof loginBodySchema>;
