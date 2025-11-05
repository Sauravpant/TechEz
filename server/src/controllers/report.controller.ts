import { Response } from "express";
import { AuthenticatedRequest } from "../types/auth.types";
import { asyncHandler } from "../utils/async-handler";
import { deleteReportService, getTechnicianReportsService, getUserReportsService, reportTechnicianService } from "../services/report.services";
import { reportTechnicianSchema } from "../validators/report.validators";
import { ITechnician } from "../models/technician.model";
import { ApiResponse } from "../utils/api-response";

export const reportTechnician = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { technicianId } = req.params;
  const userId = req.user._id.toString();
  const data = reportTechnicianSchema.parse(req.body);
  await reportTechnicianService(userId, technicianId, data);
  return res.status(201).json(new ApiResponse(201, null, "Technician reported successfully"));
});

export const getTechnicianReports = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  console.log("Fetching reports for technician ID:", req.user._id.toString());
  const reports = await getTechnicianReportsService(req.user._id.toString());
  res.status(200).json(new ApiResponse(200, reports, "Technician reports retrieved successfully"));
});

export const getUserReports = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user._id.toString();
  const reports = await getUserReportsService(userId);
  res.status(200).json(new ApiResponse(200, reports, "User reports retrieved successfully"));
});

export const deleteReport = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { reportId } = req.params;
  const userId = req.user._id.toString();
  await deleteReportService(reportId, userId);
  res.status(200).json(new ApiResponse(200, null, "Report deleted successfully"));
});
