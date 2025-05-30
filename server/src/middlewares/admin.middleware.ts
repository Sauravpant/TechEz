import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/AsyncHandler.ts";
import { AppError } from "../utils/AppError.ts";
import { User, Iuser } from "../models/user.models.ts";

interface AuthenticatedRequest extends Request {
  user: Iuser;
}

export const verifyAdmin = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> => {
  if (req.user.role !== "admin") {
    throw new AppError(403, "Access denied.");
  }
  next();
});
