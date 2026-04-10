export type Role = "user" | "technician" | "admin";

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePictureUrl?: string | null;
  address?: string | null;
  role: Role;
  isVerified: boolean;
  isDeactivated: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface TechnicianUser extends BaseUser {
  role: "technician";
  technicianId: string;
  category: string;
  experience: number;
  bio: string;
  description: string;
  registrationNumber?: string | null;
  documentUrl?: string | null;
  status?: "pending" | "approved" | "rejected";
}

export type AuthUser = BaseUser | TechnicianUser;

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterUserData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface RegisterTechnicianData extends RegisterUserData {
  experience: number;
  registrationNumber?: string;
  category: string;
  bio: string;
  description: string;
}

export interface ForgotPasswordData {
  email: string;
  otp: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

