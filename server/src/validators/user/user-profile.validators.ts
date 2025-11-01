import z from "zod";

export const updateUserProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long").max(100,"Name must be at most 100 characters long").optional(),
  phone:z.string().length(10,"Phone number must be 10 digits").optional(),
  address:z.string().min(5,"Address must be at least 2 characters long").max(200,"Address must be at most 200 characters long").optional(),
})