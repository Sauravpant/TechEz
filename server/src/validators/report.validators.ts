import z from "zod";

export const reportTechnicianSchema = z.object({
  reason: z.string().min(3, "Reason must be at least 10 characters long").max(100, "Reason must be at most 100 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long").max(500, "Description must be at most 500 characters long"),
});
