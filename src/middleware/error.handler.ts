import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any, // eslint-disable-line
  req: Request, // eslint-disable-line
  res: Response,
  next: NextFunction, // eslint-disable-line
) => {
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((error: any) => error.message); // eslint-disable-line
    return res.status(400).json({ errors });
  }
  if (err.code && err.code === 11000) {
    const errors = ["Duplicate field value entered"];
    return res.status(400).json({ errors });
  }
  return res.status(500).json({ errors: ["Server error"] });
};

export default errorHandler;
