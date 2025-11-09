import type { RequestHandler } from "express";

const get:RequestHandler<{id:string}> = async (req, res) => {
    const userId = req.params.id;
    res.send(`User ID requested: ${userId}`);
};

export default get;