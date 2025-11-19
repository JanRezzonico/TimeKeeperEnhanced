import dotenvLib from "dotenv";
import z from "zod";
dotenvLib.config();

const schema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.coerce.number(),
  DATABASE_URL: z.url(),
  JWT_EXPIRATION_SECONDS: z.coerce.number(),
  // REFRESH_TOKEN_EXPIRATION_DAYS: z.string().transform((val) => Number.parseInt(val, 10)),
  JWT_SECRET: z.string().min(32),
  EMAIL_VERIFICATION_TTL_MINS: z.coerce.number(),
});

const dotenv = schema.parse(process.env);

export default dotenv;
