import z from "zod";
import { getAllTechniciansSchema, updateTechnicianSchema } from "../validators/technician.validators";

export type GetAllTechniciansFilter = z.infer<typeof getAllTechniciansSchema>;
export type UpdateTechnician = z.infer<typeof updateTechnicianSchema>;
interface Technician {
  id: string;
  name: string;
  address: string;
  isVerified: boolean;
  profilePictureUrl: string;
  experience: number;
  category: string;
  bio: string;
  description: string;
  registeredAt: Date;
}
export interface GetAllTechnicians {
  technicians: Technician[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ReviewInfo {
  id: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    profilePictureUrl?: string;
  };
}

export interface TechnicianDetails extends Technician {
  totalBookings: number;
  averageRating: number;
  totalReviews: number;
  reviews: ReviewInfo[];
}
