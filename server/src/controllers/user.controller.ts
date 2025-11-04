import { asyncHandler } from "../utils/async-handler";
import { AuthenticatedRequest } from "../types/auth.types";
import { Response } from "express";
import { updateUserProfileSchema } from "../validators/user.validators";
import logger from "../utils/logger";
import {
  deleteProfilePictureService,
  getUserProfileService,
  updateUserProfileService,
  uploadProfilePictureService,
} from "../services/user.services";
import { ApiResponse } from "../utils/api-response";

export const updateUserProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const data = updateUserProfileSchema.parse(req.body);
  logger.info(`Name: ${data.name}, Phone: ${data.phone}, Address: ${data.address}`);
  const result = await updateUserProfileService(req.user._id.toString(), data);
  return res.status(200).json(new ApiResponse(200, result, "User profile updated successfully"));
});

export const getUserProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = await getUserProfileService(req.user._id.toString());
  return res.status(200).json(new ApiResponse(200, user, "User profile fetched successfully"));
});

export const deleteProfilePicture = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  await deleteProfilePictureService(req.user._id.toString());
  return res.status(200).json(new ApiResponse(200, null, "User profile picture deleted successfully"));
});

export const uploadProfilePicture = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.file) {
    return res.status(400).json(new ApiResponse(400, null, "Profile picture  is required"));
  }

  const result = await uploadProfilePictureService({
    fileBuffer: req.file.buffer,
    fileName: req.file.originalname,
    _id: req.user._id.toString(),
  });

  return res.status(200).json(new ApiResponse(200, result, "Profile picture uploaded successfully"));
});
