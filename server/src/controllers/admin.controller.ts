import { Request, Response } from "express";
import { User } from "../models/user.models.ts";
import { Business } from "../models/business.models.ts";
import { Technician } from "../models/technician.models.ts";
import { asyncHandler } from "../utils/AsyncHandler.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";
import { AppError } from "../utils/AppError.ts";

const getAllTechnicians = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const technicians = await Technician.find().populate("userId", "name email role");
  return res.status(200).json(new ApiResponse(200, technicians, "Technicians fetched successfully"));
});

const getPendingTechnicians = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const pending = await Technician.find({ status: "pending" }).populate("userId", "name email");
  return res.status(200).json(new ApiResponse(200, pending, "Pending technician applications"));
});

const getPendingBusinesses = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const pending = await Business.find({ status: "pending" }).populate("userId", "name email");
  return res.status(200).json(new ApiResponse(200, pending, "Pending business applications"));
});

const verifyBusiness = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const business = await Business.findOne({ userId: id });
  if (!business) throw new AppError(404, "Business user not found");

  business.status = "verified";
  await business.save({ validateBeforeSave: false });

  return res.status(200).json(new ApiResponse(200, null, "Business user verified successfully"));
});

const verifyTechnician = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const technician = await Technician.findOne({ userId: id });
  if (!technician) throw new AppError(404, "Technician not found");

  technician.status = "verified";
  await technician.save({ validateBeforeSave: false });

  return res.status(200).json(new ApiResponse(200, null, "Technician verified successfully"));
});

const deleteUser = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) throw new AppError(404, "User not found");

  await User.findByIdAndDelete(id);

  if (user.role === "technician") {
    await Technician.findOneAndDelete({ userId: id });
  }
  if (user.role === "business") {
    await Business.findOneAndDelete({ userId: id });
  }

  return res.status(200).json(new ApiResponse(200, null, "User and associated profile deleted"));
});

export { getAllTechnicians, getPendingTechnicians, getPendingBusinesses, verifyBusiness, verifyTechnician, deleteUser };
