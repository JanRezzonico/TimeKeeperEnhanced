import express, { type ErrorRequestHandler } from "express";
import dotenv from "./lib/dotenv.js";
import { disconnectDb } from "./lib/db.js";
import userRouter from "./routes/user/router.js";

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Hello from Express + TypeScript + Prisma!");
});

app.use("/user", userRouter);

app.listen(dotenv.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${dotenv.PORT}`);
});

// --- Global Bad JSON Handler ---
const badJsonHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  next();
};
app.use(badJsonHandler);
// --- End Global Bad JSON Handler ---

process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await disconnectDb();
  process.exit();
});

process.on("SIGTERM", async () => {
  console.log("Shutting down server...");
  await disconnectDb();
  process.exit();
});
