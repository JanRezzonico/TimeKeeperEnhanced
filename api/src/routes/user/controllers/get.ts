import type { RequestHandler } from "express";

// const get:RequestHandler<{id:string}> = async (req, res) => {
//     const userId = req.params.id;
//     throw new Error("Not implemented");
// };

const get: RequestHandler = async (req, res) => {
  throw new Error("Not implemented");
};

export default get;
