export interface LoginFormData {
  email: string;
  password: string;
}

export interface IndividualRegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface TechnicianRegisterFormData {
  fullName: string;
  email: string;
  password: string;
  registrationNumber: string;
  panCard: File | null;
  experience: string;
  termsAccepted: boolean;
}

export interface BusinessRegisterFormData {
  ownerName: string;
  companyName: string;
  email: string;
  password: string;
  registrationNumber: string;
  panCard: File | null;
  businessType: string;
  termsAccepted: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface RoleRouteProps {
  allowedRoles: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: "individual" | "business" | "technician" | "admin";
  createdAt: string;
  updatedAt: string;
  __v: number;
  profilePictureUrl: string;
}

export interface OtpSchema {
  email: string;
  isOtpSent: boolean;
  isEmailSent: boolean;
  loading: boolean;
  isOtpVerified: boolean;
  isEmailVerified: boolean;
}

export interface ThemeContext {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}
