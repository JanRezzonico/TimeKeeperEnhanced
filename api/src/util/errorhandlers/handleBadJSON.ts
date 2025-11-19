import type { ErrorRequestHandler } from "express";

const handleBadJSON: ErrorRequestHandler = (err, _req, res, next) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  next();
};

export default handleBadJSON;
