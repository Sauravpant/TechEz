import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ApiResponse } from "@/types/api";
import type { BookingFilters, CreateBookingRequest, TechnicianBooking, UserBooking } from "@/types/booking";
import { getApiErrorMessage } from "@/lib/errors";
import {
  acceptBooking,
  cancelTechnicianBooking,
  completeBooking,
  createManualBooking,
  getTechnicianBookings,
  getUserBookings,
  raiseBookingPrice,
  userAgreement,
  userCancelBooking,
} from "@/services/bookingServices";

export function useUserBookings(filters: BookingFilters) {
  return useQuery<ApiResponse<UserBooking[]>, unknown>({
    queryKey: ["userBookings", filters],
    queryFn: () => getUserBookings(filters),
  });
}

export function useTechnicianBookings(filters: BookingFilters) {
  return useQuery<ApiResponse<TechnicianBooking[]>, unknown>({
    queryKey: ["technicianBookings", filters],
    queryFn: () => getTechnicianBookings(filters),
  });
}

export function useCreateBooking() {
  const qc = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, CreateBookingRequest>({
    mutationFn: createManualBooking,
    onSuccess: (data) => {
      toast.success(data.message || "Booking request sent");
      qc.invalidateQueries({ queryKey: ["userBookings"] });
      qc.invalidateQueries({ queryKey: ["technicianBookings"] });
    },
    onError: (err: unknown) => toast.error(getApiErrorMessage(err, "Failed to create booking")),
  });
}

export function useUserAgreement() {
  const qc = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, { bookingId: string }>({
    mutationFn: ({ bookingId }) => userAgreement(bookingId),
    onSuccess: (data) => {
      toast.success(data.message || "Agreed to price");
      qc.invalidateQueries({ queryKey: ["userBookings"] });
      qc.invalidateQueries({ queryKey: ["technicianBookings"] });
    },
    onError: (err: unknown) => toast.error(getApiErrorMessage(err, "Failed to agree")),
  });
}

export function useUserCancelBooking() {
  const qc = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, { bookingId: string }>({
    mutationFn: ({ bookingId }) => userCancelBooking(bookingId),
    onSuccess: (data) => {
      toast.success(data.message || "Booking cancelled");
      qc.invalidateQueries({ queryKey: ["userBookings"] });
      qc.invalidateQueries({ queryKey: ["technicianBookings"] });
    },
    onError: (err: unknown) => toast.error(getApiErrorMessage(err, "Failed to cancel booking")),
  });
}

export function useRaiseBookingPrice() {
  const qc = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, { bookingId: string; finalPrice: number }>({
    mutationFn: raiseBookingPrice,
    onSuccess: (data) => {
      toast.success(data.message || "Price updated");
      qc.invalidateQueries({ queryKey: ["userBookings"] });
      qc.invalidateQueries({ queryKey: ["technicianBookings"] });
    },
    onError: (err: unknown) => toast.error(getApiErrorMessage(err, "Failed to update price")),
  });
}

export function useAcceptBooking() {
  const qc = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, { bookingId: string }>({
    mutationFn: ({ bookingId }) => acceptBooking(bookingId),
    onSuccess: (data) => {
      toast.success(data.message || "Booking accepted");
      qc.invalidateQueries({ queryKey: ["userBookings"] });
      qc.invalidateQueries({ queryKey: ["technicianBookings"] });
    },
    onError: (err: unknown) => toast.error(getApiErrorMessage(err, "Failed to accept booking")),
  });
}

export function useCompleteBooking() {
  const qc = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, { bookingId: string }>({
    mutationFn: ({ bookingId }) => completeBooking(bookingId),
    onSuccess: (data) => {
      toast.success(data.message || "Booking completed");
      qc.invalidateQueries({ queryKey: ["userBookings"] });
      qc.invalidateQueries({ queryKey: ["technicianBookings"] });
    },
    onError: (err: unknown) => toast.error(getApiErrorMessage(err, "Failed to complete booking")),
  });
}

export function useCancelTechnicianBooking() {
  const qc = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, { bookingId: string }>({
    mutationFn: ({ bookingId }) => cancelTechnicianBooking(bookingId),
    onSuccess: (data) => {
      toast.success(data.message || "Booking cancelled");
      qc.invalidateQueries({ queryKey: ["userBookings"] });
      qc.invalidateQueries({ queryKey: ["technicianBookings"] });
    },
    onError: (err: unknown) => toast.error(getApiErrorMessage(err, "Failed to cancel booking")),
  });
}

