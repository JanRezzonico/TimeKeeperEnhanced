import { PrismaClient } from "../generated/prisma/client.js";
import dotenv from "./dotenv.js";
import { PrismaPg } from "@prisma/adapter-pg";

const db = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: dotenv.DATABASE_URL,
  }),
});

const disconnectDb = async () => {
  await db.$disconnect();
};

export default db;
export { disconnectDb };
