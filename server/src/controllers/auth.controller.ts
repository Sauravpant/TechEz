import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import {
  changePasswordSchema,
  forgotPasswordSchema,
  LoginSchema,
  registerTechnicianSchema,
  registerUserSchema,
  sendOtpSchema,
} from "../validators/auth.validators";
import {
  changePasswordService,
  forgotPasswordService,
  loginService,
  logoutService,
  registerTechnicianService,
  registerUserService,
  sendOtpService,
} from "../services/auth.services";
import { ApiResponse } from "../utils/api-response";
import { AuthenticatedRequest } from "../types/auth.types";

const environment = process.env.NODE_ENV;

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = registerUserSchema.parse(req.body);
  await registerUserService(validatedData);
  return res.status(201).json(new ApiResponse(201, null, "User Registered Successfully"));
});

export const registerTechnician = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = registerTechnicianSchema.parse(req.body);
  const file = req.file;
  await registerTechnicianService({ ...validatedData, document: file ? { file: file.buffer, filename: file.originalname } : undefined });
  return res.status(201).json(new ApiResponse(201, null, "Technician Registered Successfully"));
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = LoginSchema.parse(req.body);
  const response = await loginService(validatedData.email, validatedData.password);
  res.cookie("accessToken", response.accessToken, {
    httpOnly: true,
    secure: environment === "production",
    sameSite: environment === "production" ? "none" : "strict",
  });

  res.cookie("refreshToken", response.refreshToken, {
    httpOnly: true,
    secure: environment === "production",
    sameSite: environment === "production" ? "none" : "strict",
  });

  const { accessToken, refreshToken, ...result } = response;
  return res.status(200).json(new ApiResponse(200, result, "Login Successful"));
});

export const logout = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  await logoutService(req.user?.id);
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return res.status(200).json(new ApiResponse(200, null, "Logout Successful"));
});

export const sendOtp = asyncHandler(async (req: Request, res: Response) => {
  const data = sendOtpSchema.parse(req.body);
  await sendOtpService(data.email);
  return res.status(200).json(new ApiResponse(200, null, "OTP Sent Successfully"));
});

export const changePassword = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const data = changePasswordSchema.parse(req.body);
  await changePasswordService(data, req.user?.id);
  return res.status(200).json(new ApiResponse(200, null, "Password Changed Successfully"));
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const data = forgotPasswordSchema.parse(req.body);
  await forgotPasswordService(data);
  return res.status(200).json(new ApiResponse(200, null, "Password Reset Successfully"));
});
