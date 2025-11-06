import { Review } from "../models/review.model";
import { ITechnician, Technician } from "../models/technician.model";
import { IUser } from "../models/user.model";
import { CreateReview, TechnicianReviews, UpdateReview, UserReviews } from "../types/review.types";
import { AppError } from "../utils/app-error";

export const reviewTechnicianService = async (userId: string, technicianId: string, data: CreateReview): Promise<void> => {
  const technician = await Technician.findById(technicianId);
  if (!technician) {
    throw new AppError(404, "Technician not found");
  }
  await Review.create({
    technician: technician._id,
    user: userId,
    rating: data.rating,
    comment: data.comment ?? null,
  });
};

export const updateReviewService = async (reviewId: string, data: UpdateReview): Promise<void> => {
  const review: any = {};
  if (data.rating !== undefined) {
    review.rating = data.rating;
  }
  if (data.comment !== undefined) {
    review.comment = data.comment;
  }
  await Review.findByIdAndUpdate(reviewId, { ...review });
  if (!review) {
    throw new AppError(404, "Review not found");
  }
};

export const deleteReviewService = async (reviewId: string): Promise<void> => {
  const review = await Review.findByIdAndDelete(reviewId);
  if (!review) {
    throw new AppError(404, "Review not found");
  }
};

export const getTechnicianReviewsService = async (userId: string): Promise<TechnicianReviews> => {
  const technician = await Technician.findOne({ user: userId });
  if (!technician) {
    throw new AppError(404, "Technician not found");
  }
  const result = await Review.find({ technician: technician._id })
    .populate<{ user: IUser }>("user", "_id name email phone profilePictureUrl")
    .sort({ createdAt: -1 });
  const totalReviews: number = result.length;
  const averageRating: number = totalReviews === 0 ? null : result.reduce((sum, acc) => sum + acc.rating, 0) / totalReviews;
  const reviews = result.map((report) => ({
    id: report._id.toString(),
    technician: report.technician.toString(),
    rating: report.rating,
    comment: report.comment,
    createdAt: report.createdAt,
    user: {
      userId: report.user._id.toString(),
      name: report.user.name,
      email: report.user.email,
      phone: report.user.phone,
      profilePictureUrl: report.user.profilePictureUrl,
    },
  }));
  return { averageRating, reviews, totalReviews };
};

export const getUserReviewsService = async (userId: string): Promise<UserReviews> => {
  const result = await Review.find({ user: userId })
    .populate<{ technician: ITechnician & { user: IUser } }>({
      path: "technician",
      select: "_id user",
      populate: {
        path: "user",
        select: "_id name email phone profilePictureUrl",
      },
    })
    .sort({ createdAt: -1 });
  const totalReviews: number = result.length;
  const reviews = result.map((report) => ({
    id: report._id.toString(),
    technician: {
      technicianId: report.technician._id.toString(),
      userId: report.technician.user._id.toString(),
      name: report.technician.user.name,
      email: report.technician.user.email,
      phone: report.technician.user.phone,
      profilePictureUrl: report.technician.user.profilePictureUrl,
    },
    rating: report.rating,
    comment: report.comment,
    createdAt: report.createdAt,
  }));
  return { totalReviews, reviews };
};
