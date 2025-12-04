import { Response } from "express";
import { createBidService } from "../services/bidding.services";
import { AuthenticatedRequest } from "../types/auth.types";
import { ApiResponse } from "../utils/api-response";
import { asyncHandler } from "../utils/async-handler";
import { createBidSchema } from "../validators/bidding.validators";

export const createBidRequest = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const data = createBidSchema.parse(req.body);
  const userId = req.user.id;
  await createBidService(userId, data);
  return res.status(201).json(new ApiResponse(201, null, "Bid created successfully"));
});
