import { Request, Response, NextFunction } from "express";

export function handleError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err);
  res.status(500).send("An internal error occurred");
}
