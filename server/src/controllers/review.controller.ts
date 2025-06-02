import { Request, Response } from "express";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/AsyncHandler.ts";
import { AppError } from "../utils/AppError.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";
import { Review } from "../models/reviews.models.ts";

interface AuthenticatedRequest extends Request {
  user: any;
}

const createReview = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const { rating, comment } = req.body;
  const { technicianId } = req.params;

  if (!technicianId || !rating || !comment?.trim()) {
    throw new AppError(400, "Rating, and comment are required");
  }

  const existingReview = await Review.findOne({ reviewerId: req.user._id, technicianId });
  if (existingReview) {
    throw new AppError(409, "You have already reviewed this technician");
  }

  const review = await Review.create({
    reviewerId: req.user._id,
    technicianId,
    rating: Number(rating),
    comment: comment.trim(),
  });

  return res.status(201).json(new ApiResponse(201, review, "Review submitted successfully"));
});

const getReviewsByTechnician = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const { technicianId } = req.params;

  const reviews = await Review.find({ technicianId }).populate("reviewerId", "name email");

  const avgResult = await Review.aggregate([
    { $match: { technicianId: new mongoose.Types.ObjectId(technicianId) } },
    { $group: { _id: "$technicianId", averageRating: { $avg: "$rating" }, totalReviews: { $sum: 1 } } },
  ]);

  const averageRating = avgResult[0]?.averageRating || 0;
  const totalReviews = avgResult[0]?.totalReviews || 0;

  return res.status(200).json(new ApiResponse(200, { reviews, averageRating, totalReviews }, "Technician reviews and ratings"));
});

const getMyReviews = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const reviews = await Review.find({ reviewerId: req.user._id }).populate("technicianId", "name");

  const avgResult = await Review.aggregate([
    { $match: { reviewerId: req.user._id } },
    { $group: { _id: "$reviewerId", averageRating: { $avg: "$rating" }, totalReviews: { $sum: 1 } } },
  ]);

  const averageRating = avgResult[0]?.averageRating || 0;
  const totalReviews = avgResult[0]?.totalReviews || 0;

  return res.status(200).json(new ApiResponse(200, { reviews, averageRating, totalReviews }, "Your submitted reviews and average rating"));
});

const deleteReview = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const { reviewId } = req.params;

  const review = await Review.findById(reviewId);
  if (!review) {
    throw new AppError(404, "Review not found");
  }

  if (review.reviewerId.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    throw new AppError(403, "Not authorized to delete this review");
  }

  await Review.findByIdAndDelete(reviewId);

  return res.status(200).json(new ApiResponse(200, null, "Review deleted successfully"));
});

const updateReview = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const { reviewId } = req.params;
  const { comment, rating } = req.body;

  const review = await Review.findById(reviewId);
  if (!review) {
    throw new AppError(404, "Review not found");
  }

  if (review.reviewerId.toString() !== req.user._id.toString()) {
    throw new AppError(403, "Not authorized to update this review");
  }

  review.comment = comment || review.comment;
  review.rating = rating !== undefined ? Number(rating) : review.rating;
  await review.save();

  return res.status(200).json(new ApiResponse(200, review, "Review updated successfully"));
});

export { createReview, getReviewsByTechnician, getMyReviews, deleteReview, updateReview };