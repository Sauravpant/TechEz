import { Response } from "express";
import { AuthenticatedRequest } from "../types/auth.types";
import { asyncHandler } from "../utils/async-handler";
import { createBookingRequestSchema, raiseBookingPriceSchema } from "../validators/booking.validators";
import {
  acceptManualBookingService,
  cancelBookingByTechnicianService,
  cancelBookingByUserService,
  completeManualBookingService,
  createManualBookingRequestService,
  raiseManualBookingPriceService,
  userAgreementService,
} from "../services/booking.services";
import { ApiResponse } from "../utils/api-response";

export const createManualBookingRequest = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user._id.toString();
  const data = createBookingRequestSchema.parse(req.body);
  await createManualBookingRequestService(userId, data);
  return res.status(201).json(new ApiResponse(201, null, "Booking request created successfully"));
});

export const raiseManualBookingPrice = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user._id.toString();
  const data = raiseBookingPriceSchema.parse(req.body);
  await raiseManualBookingPriceService(userId, data);
  return res.status(200).json(new ApiResponse(200, null, "Booking price raised successfully"));
});

export const cancelTechnicianBooking = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const bookingId = req.params.bookingId;
  const userId = req.user._id.toString();
  await cancelBookingByTechnicianService(userId, bookingId);
  return res.status(200).json(new ApiResponse(200, null, "Booking cancelled successfully"));
});

export const acceptManualBooking = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const bookingId = req.params.bookingId;
  const userId = req.user._id.toString();
  await acceptManualBookingService(userId, bookingId);
  return res.status(200).json(new ApiResponse(200, null, "Booking accepted successfully"));
});

export const completeManualBooking = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const bookingId = req.params.bookingId;
  const userId = req.user._id.toString();
  await completeManualBookingService(userId, bookingId);
  return res.status(200).json(new ApiResponse(200, null, "Booking completed successfully"));
});

export const userAgreement = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const bookingId = req.params.bookingId;
  const userId = req.user._id.toString();
  await userAgreementService(userId, bookingId);
  return res.status(200).json(new ApiResponse(200, null, "User agreement recorded successfully"));
});

export const userCancelBooking = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const bookingId = req.params.bookingId;
  const userId = req.user._id.toString();
  await cancelBookingByUserService(userId, bookingId);
  return res.status(200).json(new ApiResponse(200, null, "Booking cancelled successfully"));
});
