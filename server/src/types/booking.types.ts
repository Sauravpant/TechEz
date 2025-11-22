import z from "zod";
import { bookingFiltersSchema, createBookingRequestSchema, raiseBookingPriceSchema } from "../validators/booking.validators";

export type CreateBookingRequest = z.infer<typeof createBookingRequestSchema>;
export type RaiseBookingPrice = z.infer<typeof raiseBookingPriceSchema>;
export type BookingFilters = z.infer<typeof bookingFiltersSchema>;

export interface UserBookings {
  id: string;
  technician: {
    id: string;
    name: string;
    email: string;
    phone: string;
    profilePictureUrl: string;
  };
  category: string;
  title: string;
  description: string;
  initialPrice: number;
  finalPrice: number;
  location: string;
  status: "pending" | "accepted" | "completed" | "cancelled";
  bookingMethod: "manual" | "bid";
  userAgreement: boolean;
  createdAt: Date;
}

export interface TechnicianBookings {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;  
    phone: string;
    profilePictureUrl: string;
  };
  category: string; 
  title: string;
  description: string;
  initialPrice: number;
  finalPrice: number;
  location: string;
  status: "pending" | "accepted" | "completed" | "cancelled";
  bookingMethod: "manual" | "bid";
  userAgreement: boolean;
  createdAt: Date;
} 