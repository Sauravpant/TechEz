import { Request } from "express";
import { IUser } from "../models/user.model";
import z from "zod";
import { changePasswordSchema, forgotPasswordSchema, registerTechnicianSchema, registerUserSchema } from "../validators/auth.validators";

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export type RegisterUser = z.infer<typeof registerUserSchema>;
export type TechnicianDetails = z.infer<typeof registerTechnicianSchema>;
export type ChangePassword = z.infer<typeof changePasswordSchema>;
export type ForgotPassword = z.infer<typeof forgotPasswordSchema>;

export interface RegisterTechnician extends TechnicianDetails {
  document?: {
    file: Buffer;
    filename: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePictureUrl: string | null;
  address: string | null;
  role: "user" | "admin" | "technician";
  isVerified: boolean;
  isDeactivated: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TechnicianInfo extends User {
  technicianId: string;
  user: string;
  category: string;
  experience: number;
  bio: string;
  description: string;
  registrationNumber: string | null;
  documentUrl: string | null;
  status: "pending" | "approved" | "rejected";
}
export interface UserLogin {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface TechnicianLogin {
  accessToken: string;
  refreshToken: string;
  technician: TechnicianInfo;
}
