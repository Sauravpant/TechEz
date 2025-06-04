import { Request, Response } from "express";
import { ITechnician, Technician } from "../models/technician.models.ts";
import { Booking } from "../models/booking.models.ts";
import { User } from "../models/user.models.ts";
import { AppError } from "../utils/AppError.ts";
import { asyncHandler } from "../utils/AsyncHandler.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";
import mongoose from "mongoose";
import { Iuser } from "../models/user.models.ts";

interface AuthenticatedRequest extends Request {
  user: Iuser;
  technician: ITechnician;
}

const updateTechnicianProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { phone, address, rate, unit } = req.body;
  if (!phone?.trim() || !address?.trim() || !rate.trim() || !unit.trim()) {
    throw new AppError(400, "Fields cannot be empty");
  }
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new AppError(404, "User not found");
  }
  const technician = await Technician.findById(req.technician._id);
  user.phone = phone;
  user.address = address;
  await user.save({ validateBeforeSave: false });
  technician.rate = rate;
  technician.unit = unit;
  await technician.save({ validateBeforeSave: false });
  return res.status(200).json(new ApiResponse(200, user, "Technician profile updated successfully"));
});

const deleteTechnicianAccount = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new AppError(404, "User not found");
  }
  const technician = await Technician.findOne({ userId: req.user._id });
  if (technician) {
    await technician.deleteOne();
  }
  await user.deleteOne();
  return res.status(200).json(new ApiResponse(200, null, "Technician account deleted successfully"));
});

const getAssignedBookings = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const bookings = await Booking.find({ technicianId: req.user._id }).populate("userId", "name email phone").sort({ createdAt: -1 });

  return res.status(200).json(new ApiResponse(200, bookings, "Fetched assigned bookings"));
});

const updateBookingStatus = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { bookingId } = req.params;
  const { status } = req.body;

  const validStatuses = ["pending", "accepted", "completed", "rejected"];
  if (!validStatuses.includes(status)) {
    throw new AppError(400, "Invalid status");
  }

  const booking = await Booking.findOne({ _id: bookingId, technicianId: req.user._id });
  if (!booking) {
    throw new AppError(404, "Booking not found");
  }

  booking.status = status;
  await booking.save();

  return res.status(200).json(new ApiResponse(200, booking, `Booking status updated to ${status}`));
});

const markBookingAsPaid = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { bookingId } = req.params;

  const booking = await Booking.findOne({
    _id: bookingId,
    technicianId: req.user._id,
  });

  if (!booking) {
    throw new AppError(404, "Booking not found");
  }

  if (booking.status !== "completed") {
    throw new AppError(400, "Only completed bookings can be marked as paid");
  }

  if (booking.isPaid) {
    throw new AppError(400, "Booking already marked as paid");
  }

  booking.isPaid = true;
  booking.paidAt=new Date();
  await booking.save();

  return res.status(200).json(new ApiResponse(200, booking, "Booking marked as paid"));
});

export { updateTechnicianProfile, deleteTechnicianAccount, getAssignedBookings, updateBookingStatus, markBookingAsPaid };
