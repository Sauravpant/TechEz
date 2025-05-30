import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/AsyncHandler.ts";
import { AppError } from "../utils/AppError.ts";
import { Iuser } from "../models/user.models.ts";
import { Business,IBusiness } from "../models/business.model.ts";

interface AuthenticatedRequest extends Request {
  user: Iuser;
  business?:IBusiness;
}

export const verifyBusinessUser = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> => {
  const business = await Business.findOne({ userId: req.user._id });
  if (!business || business.status!=="verified") {
    throw new AppError(403, "Access denied. Not a verified business user.");
  }
  req.business = business;
  next();
});
