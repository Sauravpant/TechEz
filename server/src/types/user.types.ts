import z from "zod";
import { updateUserProfileSchema } from "../validators/user.validators";

export type UpdateUserProfile= z.infer<typeof updateUserProfileSchema>