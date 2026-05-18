import { Request, Response, NextFunction } from "express";

export const apiKeyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({
      message: "API key is missing, access denied",
    });
  }
  next();
};
