import { Request, Response } from "express";

export function handleError(err: Error, req: Request, res: Response) {
  console.error(err);
  res.status(500).send("An internal error occurred");
}
