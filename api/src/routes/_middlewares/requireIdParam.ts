import type { RequestHandler } from "express";
import z from "zod";

const requireIdParam: RequestHandler<{ id: string }> = (req, res, next) => {
  const { id } = req.params;
  const parseResult = z.cuid().safeParse(id);
  if (!parseResult.success) {
    return res.status(400).json({
      error: "Invalid ID parameter",
      details: z.treeifyError(parseResult.error),
    });
  }
  next();
};
export default requireIdParam;
