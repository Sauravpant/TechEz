import { NextFunction, Request } from "express";
import { asyncHandler } from "../utils/async-handler";
import { AppError } from "../utils/app-error";
import { IUser, User } from "../models/user.model";
interface AuthenticatedRequest extends Request {
  user: IUser;
}
export const verifyAdmin = asyncHandler(async (req: AuthenticatedRequest, _, next: NextFunction) => {
  const user = await User.findById(req.user._id).select("role");
  if (!user) {
    throw new AppError(404, "User doesnt exist");
  }
  if (user.role !== "admin") {
    throw new AppError(401, "Unauthorized: Admin access only");
  } else {
    next();
  }
});
