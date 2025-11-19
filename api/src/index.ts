import express from "express";
import dotenv from "./lib/dotenv.js";
import { disconnectDb } from "./lib/db.js";
import userRouter from "./routes/user/router.js";
import authRouter from "./routes/auth/router.js";
import handleBadJSON from "./util/errorhandlers/handleBadJSON.js";

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  res.json({ message: "Welcome to the TimeKeeper Enhanced API!" });
});

app.use("/user", userRouter);

app.use("/auth", authRouter);

app.listen(dotenv.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${dotenv.PORT}`);
});

app.use(handleBadJSON);

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
