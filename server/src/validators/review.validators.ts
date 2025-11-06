import z from "zod";

export const createReviewSchema = z.object({
  rating: z.coerce.number().min(1, "Rating must be at least 1").max(5, "Rating must be between 1 and 5"),
  comment: z.string().min(3, "Comment must be at least 3 characters long").max(300, "Comment must be at most 300 characters long").optional(),
});

export const updateReviewSchema = z.object({
  rating: z.coerce.number().min(1, "Rating must be at least 1").max(5, "Rating must be between 1 and 5").optional(),
  comment: z.string().min(3, "Comment must be at least 3 characters long").max(300, "Comment must be at most 300 characters long").optional(),
});