import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { getAllTechniciansSchema } from "../validators/technician.validators";
import { getAllTechniciansService } from "../services/technician.services";
import { ApiResponse } from "../utils/api-response";

export const getAllTechnicians = asyncHandler(async (req: Request, res: Response) => {
  const query = getAllTechniciansSchema.parse(req.query);
  const result = await getAllTechniciansService(query);

  return res.status(200).json(new ApiResponse(200, result, "Technicians fetched successfully"));
});
