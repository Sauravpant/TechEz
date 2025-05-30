import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.ts";

const errorMiddleware = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong",
    errors: err.errors || [],
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

export default errorMiddleware;
