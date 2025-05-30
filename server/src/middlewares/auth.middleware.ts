import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User, Iuser } from "../models/user.models.ts";
import { asyncHandler } from "../utils/AsyncHandler.ts";
import { AppError } from "../utils/AppError.ts";

interface AuthenticatedRequest extends Request {
  user: Iuser;
}

export const verifyJWT = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> => {
  const bearerToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

  if (!bearerToken) {
    throw new AppError(401, "Unauthorized access");
  }
  let decodedToken: JwtPayload;
  try {
    decodedToken = jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;
  } catch (error) {
    throw new AppError(401, "Token is invalid or expired");
  }
  const user = await User.findById(decodedToken?._id);
  if (!user) {
    throw new AppError(404, "Invalid token");
  }
  req.user = user;
  next();
});
