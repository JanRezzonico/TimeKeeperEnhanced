import z from "zod";

const confirmVerifyEmailQuerySchema = z.object({
  email: z.email(),
  token: z.string().length(64),
});

export default confirmVerifyEmailQuerySchema;
export type ConfirmVerifyEmailQuerySchema = z.infer<
  typeof confirmVerifyEmailQuerySchema
>;
