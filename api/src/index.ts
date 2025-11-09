import express from 'express';
import dotenv from './lib/dotenv.js';
import { disconnectDb } from './lib/db.js';

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello from Express + TypeScript + Prisma!');
});

app.listen(dotenv.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${dotenv.PORT}`);
});

process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await disconnectDb();
  process.exit();
});

process.on('SIGTERM', async () => {
  console.log('Shutting down server...');
  await disconnectDb();
  process.exit();
});