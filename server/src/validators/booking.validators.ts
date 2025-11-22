import z from "zod";

export const createBookingRequestSchema = z.object({
  technicianId: z.string(),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
  initialPrice: z.coerce.number().min(0, "Initial price must be at least 0"),
});

export const raiseBookingPriceSchema = z.object({
  bookingId: z.string(),
  finalPrice: z.coerce.number().min(0, "Final price must be at least 0"),
});

export const bookingFiltersSchema = z.object({
  status: z.enum(["pending", "accepted", "completed", "cancelled"]).optional(),
  bookingMethod: z.enum(["manual", "bid"]).optional(),
  limit: z.coerce.number().min(1).max(100).optional(),
  page: z.coerce.number().min(0).optional(),
  sortBy: z.enum(["asc", "desc"]).optional(),
});
