import z from "zod";

export const getAllTechniciansSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long").optional(),
  category: z.string().min(2, "Category must be at least 2 characters long").optional(),
  experience: z.coerce.number().min(0, "Experience must be a positive number").optional(),
  address: z.string().min(5, "Address must be at least 5 characters long").optional(),
  verificationType: z.enum(["license", "manual"]).optional(),
  page: z.coerce.number().min(1, "Page must be at least 1").optional(),
  limit: z.coerce.number().min(1, "Limit must be at least 1").max(100, "Limit cannot exceed 100").optional(),
});

export const updateTechnicianSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long").optional(),
  address: z.string().min(5, "Address must be at least 5 characters long").optional(),
  phone: z.string().min(10, "Phone number must be at least 10 digits long").max(15, "Phone number cannot exceed 15 digits").optional(),
  experience: z.coerce.number().min(0, "Experience must be a positive number").optional(),
  category: z.string().min(2, "Category must be at least 2 characters long").optional(),
  bio: z.string().min(5, "Bio must be at least 5 characters long").max(500, "Bio cannot exceed 500 characters").optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(2000, "Description cannot exceed 2000 characters")
    .optional(),
});
