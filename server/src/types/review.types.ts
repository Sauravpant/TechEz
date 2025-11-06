import z from "zod";
import { createReviewSchema, updateReviewSchema } from "../validators/review.validators";

export type CreateReview = z.infer<typeof createReviewSchema>;
export type UpdateReview = z.infer<typeof updateReviewSchema>;

export interface TechnicianReviews {
  reviews: {
    id: string;
    technician: string;
    rating: number;
    comment: string;
    createdAt: Date;
    user: {
      userId: string;
      name: string;
      email: string;
      phone: string;
      profilePictureUrl: string;
    };
  }[];
  totalReviews: number;
  averageRating: number | null;
}

export interface UserReviews {
  reviews: {
    id: string;
    technician: {
      technicianId: string;
      userId: string;
      name: string;
      email: string;
      phone: string;
      profilePictureUrl: string;
    };
    rating: number;
    comment: string;
    createdAt: Date;
  }[];
  totalReviews: number;
}
