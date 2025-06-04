import { Request, Response } from "express";
import { Booking } from "../models/booking.models.ts";
import { User } from "../models/user.models.ts";
import { Technician } from "../models/technician.models.ts";
import { AppError } from "../utils/AppError.ts";
import { asyncHandler } from "../utils/AsyncHandler.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";
import mongoose from "mongoose";
import { Iuser } from "../models/user.models.ts";
import { Business, IBusiness } from "../models/business.models.ts";

interface AuthenticatedRequest extends Request {
  user: Iuser;
  business: IBusiness;
}

const updateBusinessProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { phone, address } = req.body;
  if (!phone?.trim() || !address?.trim()) {
    throw new AppError(400, "Fields cannot be empty");
  }
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new AppError(404, "User not found");
  }
  user.phone = phone;
  user.address = address;
  await user.save({ validateBeforeSave: false });
  return res.status(200).json(new ApiResponse(200, user, "Business profile updated successfully"));
});

const deleteBusinessAccount = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new AppError(404, "User not found");
  }
  const business = await Business.findById(req.business._id);
  await user.deleteOne();
  await business.deleteOne();
  return res.status(200).json(new ApiResponse(200, null, "Business account deleted successfully"));
});

const createBusinessBooking = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { technicianId } = req.params;
  const { serviceType, address, requestedDate } = req.body;

  if (!technicianId || !serviceType || !address || !requestedDate) {
    throw new AppError(400, "All fields are required");
  }

  const technician = await Technician.findOne({ userId: technicianId, status: "verified" });
  if (!technician) {
    throw new AppError(404, "Technician not found");
  }

  const booking = await Booking.create({
    userId: req.user._id,
    technicianId,
    serviceType,
    address,
    requestedDate,
    isBusiness: true,
    price:technician.rate,
  });

  return res.status(201).json(new ApiResponse(201, booking, "Booking created successfully"));
});

const getMyBusinessBookings = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const bookings = await Booking.find({ userId: req.user._id, isBusiness: true })
    .populate("technicianId", "name email phone")
    .sort({ createdAt: -1 });

  return res.status(200).json(new ApiResponse(200, bookings, "Fetched business bookings"));
});

const cancelBusinessBooking = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const {bookingId} = req.params;

  const booking = await Booking.findOne({ _id: bookingId, userId: req.user._id, isBusiness: true });
  if (!booking) {
    throw new AppError(404, "Booking not found");
  }

  if (booking.status !== "pending") {
    throw new AppError(400, "Only pending bookings can be cancelled");
  }

  await booking.deleteOne();
  return res.status(200).json(new ApiResponse(200, null, "Booking cancelled successfully"));
});

export { createBusinessBooking, getMyBusinessBookings, cancelBusinessBooking, updateBusinessProfile, deleteBusinessAccount };
