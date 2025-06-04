import { Request, Response } from "express";
import { User, Iuser } from "../models/user.models.ts";
import { Booking } from "../models/booking.models.ts";
import { AppError } from "../utils/AppError.ts";
import { asyncHandler } from "../utils/AsyncHandler.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";
import { Technician } from "../models/technician.models.ts";

interface AuthenticatedRequest extends Request {
  user: Iuser;
}

const updateDetails = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { phone, address } = req.body;
  if (!phone?.trim() || !address?.trim()) {
    throw new AppError(400, "Fields cannot be empty");
  }

  const user = await User.findById(req.user._id);
  if (!user) throw new AppError(404, "User not found");

  user.phone = phone;
  user.address = address;
  await user.save({ validateBeforeSave: false });

  res.status(200).json(new ApiResponse(200, user, "Details updated successfully"));
});

const createBooking = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { technicianId } = req.params;
  const { serviceType, address, requestedDate } = req.body;

  if (!technicianId || !serviceType || !address || !requestedDate) {
    throw new AppError(400, "All fields are required");
  }
  const activeBooking = await Booking.findOne({
    userId: req.user._id,
    isBusiness: false,
    status: { $in: ["pending", "accepted"] },
  });

  if (activeBooking) {
    throw new AppError(403, "You already have an active booking. Complete or cancel it before creating a new one.");
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
    isBusiness: false,
    price: technician.rate,
  });

  return res.status(201).json(new ApiResponse(201, booking, "Booking created successfully"));
});

const getMyBookings = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const bookings = await Booking.find({
    userId: req.user._id,
    isBusiness: false,
  }).populate("technicianId", "name email ");

  return res.status(200).json(new ApiResponse(200, bookings, "Bookings fetched successfully"));
});

const cancelBooking = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { bookingId } = req.params;

  const booking = await Booking.findOne({
    _id: bookingId,
    userId: req.user._id,
    isBusiness: false,
  });

  if (!booking) {
    throw new AppError(404, "Booking not found");
  }

  if (booking.status !== "pending") {
    throw new AppError(400, "Only pending bookings can be cancelled");
  }

  await booking.deleteOne();

  return res.status(200).json(new ApiResponse(200, null, "Booking cancelled successfully"));
});

const deleteAccount = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = await User.findById(req.user._id);
  if (!user) throw new AppError(404, "User not found");

  await user.deleteOne();
  res.status(200).json(new ApiResponse(200, null, "Account deleted successfully"));
});

export { updateDetails, deleteAccount, createBooking, getMyBookings, cancelBooking };
