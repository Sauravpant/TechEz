import { Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/app-error";
import { User } from "../models/user.model";
import { asyncHandler } from "../utils/async-handler";
import { IUser } from "../models/user.model";

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export const verifyJWT = asyncHandler(async (req: AuthenticatedRequest, _, next: NextFunction) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new AppError(201, "Unauthorized access");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { userId: string };
    const user = await User.findById(decodedToken?.userId).select("-password -refreshToken");
    if (!user) {
      throw new AppError(404, "Invalid token");
    }
    req.user = user;
    next();
  } catch (err: any) {
    throw new AppError(401, "Invalid or expired token");
  }
});
