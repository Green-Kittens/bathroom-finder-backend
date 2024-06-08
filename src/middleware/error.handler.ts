import { Request, Response } from "express";

// Define custom error types
interface ValidationError extends Error {
  name: "ValidationError";
  errors: { [key: string]: { message: string } };
}

interface MongoError extends Error {
  code: number;
}

type CustomError = ValidationError | MongoError | Error;

// Error handler middleware
const errorHandler = (err: CustomError, req: Request, res: Response) => {
  if (err.name === "ValidationError") {
    const validationError = err as ValidationError;
    const errors = Object.values(validationError.errors).map(
      (error) => error.message,
    );
    return res.status(400).json({ errors });
  }
  if ("code" in err && err.code === 11000) {
    const errors = ["Duplicate field value entered"];
    return res.status(400).json({ errors });
  }
  return res.status(500).json({ errors: ["Server error"] });
};

export default errorHandler;
