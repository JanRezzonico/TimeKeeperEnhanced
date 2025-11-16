import dotenvLib from 'dotenv';
import z from 'zod';
dotenvLib.config();

const schema = z.object({
  PORT: z.string().transform((val) => Number.parseInt(val, 10)).default(3000),
  DATABASE_URL: z.url(),
  JWT_EXPIRATION_SECONDS: z.string().transform((val) => Number.parseInt(val, 10)),
  // REFRESH_TOKEN_EXPIRATION_DAYS: z.string().transform((val) => Number.parseInt(val, 10)),
  JWT_SECRET: z.string().min(32),
});

const dotenv = schema.parse(process.env);

export default dotenv;