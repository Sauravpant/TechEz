import { Response } from "express";
import { deleteReviewService, getTechnicianReviewsService, getUserReviewsService, reviewTechnicianService, updateReviewService } from "../services/review.services";
import { AuthenticatedRequest } from "../types/auth.types";
import { asyncHandler } from "../utils/async-handler";
import { createReviewSchema, updateReviewSchema } from "../validators/review.validators";
import { ApiResponse } from "../utils/api-response";

export const reviewTechnician = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { technicianId } = req.params;
  const userId = req.user.id;
  const data = createReviewSchema.parse(req.body);
  await reviewTechnicianService(userId, technicianId, data);
  return res.status(201).json(new ApiResponse(201, null, "Review submitted successfully"));
});

export const updateReview = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { reviewId } = req.params;
  const data = updateReviewSchema.parse(req.body);
  await updateReviewService(reviewId, data);
  return res.status(200).json(new ApiResponse(200, null, "Review updated successfully"));
});

export const deleteReview = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { reviewId } = req.params;
  await deleteReviewService(reviewId);
  return res.status(200).json(new ApiResponse(200, null, "Review deleted successfully"));
});

export const getTechnicianReviews = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user.id;
  const reviews = await getTechnicianReviewsService(userId);
  return res.status(200).json(new ApiResponse(200, reviews, "Technician reviews fetched successfully"));
});

export const getUserReviews = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user.id;
  const reviews = await getUserReviewsService(userId);
  return res.status(200).json(new ApiResponse(200, reviews, "User reviews fetched successfully"));
});