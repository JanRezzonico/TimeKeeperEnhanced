import type { RequestHandler } from "express";
import { z, type ZodObject } from "zod";

const parseBody = (schema: ZodObject<any>) => {
  const middleware: RequestHandler = (req, res, next) => {
    const parseResult = schema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        error: "Invalid request body",
        details: z.treeifyError(parseResult.error),
      });
    }
    req.body = parseResult.data;
    next();
  };
  return middleware;
};

export default parseBody;
