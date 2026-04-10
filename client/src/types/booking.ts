export type BookingStatus = "pending" | "accepted" | "completed" | "cancelled";
export type BookingMethod = "manual" | "bid";

export interface BookingUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePictureUrl?: string | null;
}

export interface BookingTechnician {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePictureUrl?: string | null;
}

export interface UserBooking {
  id: string;
  technician: BookingTechnician;
  category: string;
  title: string;
  description: string;
  initialPrice: number;
  finalPrice: number;
  location: string;
  status: BookingStatus;
  bookingMethod: BookingMethod;
  userAgreement: boolean;
  createdAt: string | Date;
}

export interface TechnicianBooking {
  id: string;
  user: BookingUser;
  category: string;
  title: string;
  description: string;
  initialPrice: number;
  finalPrice: number;
  location: string;
  status: BookingStatus;
  bookingMethod: BookingMethod;
  userAgreement: boolean;
  createdAt: string | Date;
}

export interface BookingFilters {
  status?: BookingStatus;
  bookingMethod?: BookingMethod;
  limit?: number;
  page?: number;
  sortBy?: "asc" | "desc";
}

export interface CreateBookingRequest {
  technicianId: string;
  category: string;
  location: string;
  title: string;
  description: string;
  initialPrice: number;
}

