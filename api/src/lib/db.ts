import { PrismaClient } from '../generated/prisma/client.js';

const db = new PrismaClient()

const disconnectDb = async () => {
  await db.$disconnect();
}

export default db;
export { disconnectDb };