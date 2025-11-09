import dotenvLib from 'dotenv';
import z from 'zod';
dotenvLib.config();

const schema = z.object({
  PORT: z.string().transform((val) => parseInt(val, 10)).default(3000),
//   DATABASE_URL: z.url(),
});

const dotenv = schema.parse(process.env);

export default dotenv;