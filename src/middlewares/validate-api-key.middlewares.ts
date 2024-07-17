import { NextFunction, Request, Response } from "express";
import { API_KEY } from "../config";

export default async function validateApiKeyMiddlewares(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiKey = req.header("x-api-key");

  if (!apiKey) {
    return res.status(401).json({ error: "API key missing" });
  }

  if (apiKey !== API_KEY) {
    return res.status(401).json({ error: "Invalid API key" });
  }

  next();
}
