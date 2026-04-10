import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types/api";
import type { BookingFilters, CreateBookingRequest, TechnicianBooking, UserBooking } from "@/types/booking";

export async function createManualBooking(data: CreateBookingRequest): Promise<ApiResponse<null>> {
  const res = await api.post<ApiResponse<null>>("/booking/create-booking", data);
  return res.data;
}

export async function userAgreement(bookingId: string): Promise<ApiResponse<null>> {
  const res = await api.patch<ApiResponse<null>>(`/booking/user-agreement/${bookingId}`);
  return res.data;
}

export async function userCancelBooking(bookingId: string): Promise<ApiResponse<null>> {
  const res = await api.patch<ApiResponse<null>>(`/booking/cancel-user-booking/${bookingId}`);
  return res.data;
}

export async function getUserBookings(filters: BookingFilters): Promise<ApiResponse<UserBooking[]>> {
  const res = await api.get<ApiResponse<UserBooking[]>>("/booking/user-bookings", { params: filters });
  return res.data;
}

export async function getTechnicianBookings(filters: BookingFilters): Promise<ApiResponse<TechnicianBooking[]>> {
  const res = await api.get<ApiResponse<TechnicianBooking[]>>("/booking/technician-bookings", { params: filters });
  return res.data;
}

export async function raiseBookingPrice(data: { bookingId: string; finalPrice: number }): Promise<ApiResponse<null>> {
  const res = await api.patch<ApiResponse<null>>("/booking/raise-booking-price", data);
  return res.data;
}

export async function acceptBooking(bookingId: string): Promise<ApiResponse<null>> {
  const res = await api.patch<ApiResponse<null>>(`/booking/accept-booking/${bookingId}`);
  return res.data;
}

export async function completeBooking(bookingId: string): Promise<ApiResponse<null>> {
  const res = await api.patch<ApiResponse<null>>(`/booking/complete-booking/${bookingId}`);
  return res.data;
}

export async function cancelTechnicianBooking(bookingId: string): Promise<ApiResponse<null>> {
  const res = await api.patch<ApiResponse<null>>(`/booking/cancel-technician-booking/${bookingId}`);
  return res.data;
}

