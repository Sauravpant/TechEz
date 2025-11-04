import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { getAllTechniciansSchema, updateTechnicianSchema } from "../validators/technician.validators";
import {
  deleteVerificationDocumentService,
  getAllTechniciansService,
  getTechnicianByIdService,
  updateTechnicianProfileService,
  uploadVerificationDocumentService,
} from "../services/technician.services";
import { ApiResponse } from "../utils/api-response";
import { AuthenticatedRequest } from "../types/auth.types";
import { AppError } from "../utils/app-error";

export const getAllTechnicians = asyncHandler(async (req: Request, res: Response) => {
  const query = getAllTechniciansSchema.parse(req.query);
  const result = await getAllTechniciansService(query);
  return res.status(200).json(new ApiResponse(200, result, "Technicians fetched successfully"));
});

export const getTechnicianById = asyncHandler(async (req: Request, res: Response) => {
  const { technicianId } = req.params;
  const result = await getTechnicianByIdService(technicianId);
  return res.status(200).json(new ApiResponse(200, result, "Technician details fetched successfully"));
});

export const updateTechnicianDetails = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const technicianId = req.user.id;
  const data = updateTechnicianSchema.parse(req.body);
  const result = await updateTechnicianProfileService(technicianId, data);
  return res.status(200).json(new ApiResponse(200, result, "Technician profile updated successfully"));
});

export const uploadVerificationDocument = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const file = req.file;
  if (!file) {
    throw new AppError(400, "Document is required");
  }
  const result = await uploadVerificationDocumentService(req.user._id.toString(), { fileBuffer: file.buffer, fileName: file.originalname });
  return res.status(200).json(new ApiResponse(200, result, "Verification document uploaded successfully"));
});


export const deleteVerificationDocument = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  await deleteVerificationDocumentService(req.user._id.toString());
  return res.status(200).json(new ApiResponse(200, null, "Verification document deleted successfully"));
});