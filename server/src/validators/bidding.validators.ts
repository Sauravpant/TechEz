import z from "zod";

export const createBidSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long").max(100, "Title must be at most 100 characters long"),
  category: z.string().min(2, "Category must be at least 3 characters long").max(50, "Category must be at most 50 characters long"),
  offeredPrice: z.coerce.number().positive("Offered price must be a positive number"),
  description: z.string().min(10, "Description must be at least 10 characters long").max(1000, "Description must be at most 1000 characters long"),
});
