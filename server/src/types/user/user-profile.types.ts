import z from "zod";
import { updateUserProfileSchema } from "../../validators/user/user-profile.validators";

export type UpdateUserProfile= z.infer<typeof updateUserProfileSchema>