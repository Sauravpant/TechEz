import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/AsyncHandler.ts";
import { AppError } from "../utils/AppError.ts";
import { Iuser } from "../models/user.models.ts";
import { ITechnician, Technician } from "../models/technician.models.ts";

interface AuthenticatedRequest extends Request {
  user: Iuser;
  technician?:ITechnician;
}

export const verifyTechnician = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> => {
  const technician = await Technician.findOne({ userId: req.user._id });
  if (!technician || technician.status!=="verified") {
    throw new AppError(403, "Access denied. Not a verified technician.");
  }
  req.technician = technician;
  next();
});
