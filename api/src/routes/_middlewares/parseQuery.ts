import type { RequestHandler } from "express";
import { z, type ZodObject } from "zod";

const parseQuery = (schema: ZodObject<any>) => {
  const middleware: RequestHandler = (req, res, next) => {
    const parseResult = schema.safeParse(req.query);
    if (!parseResult.success) {
      return res.status(400).json({
        error: "Invalid request query parameters",
        details: z.treeifyError(parseResult.error),
      });
    }
    req.parsedQuery = parseResult.data;
    next();
  };
  return middleware;
};

export default parseQuery;
