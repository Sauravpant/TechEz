import { Request, Response } from "express";
import { User, Iuser } from "../models/user.models.ts";
import { asyncHandler } from "../utils/AsyncHandler.ts";
import { AppError } from "../utils/AppError.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";
import { uploadToCloudinary } from "../utils/cloudinary.ts";
import { Technician } from "../models/technician.models.ts";
import { Business } from "../models/business.models.ts";
import { Schema } from "mongoose";

interface AuthenticatedRequest extends Request {
  user: Iuser;
}

const generateAccessAndRefreshTokens = async (userId: string | Schema.Types.ObjectId): Promise<{ accessToken: string; refreshToken: string }> => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(404, "User not found");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new AppError(500, "Something went wrong");
  }
};

const registerIndividualUser = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const { fullName, email, password } = req.body;

  if (!fullName?.trim() || !email?.trim() || !password?.trim()) {
    throw new AppError(400, "All fields are required");
  }

  const userExists = await User.findOne({ email: email.trim().toLowerCase() });
  if (userExists) {
    throw new AppError(409, "Email is already registered");
  }

  const user = await User.create({
    name: fullName.trim(),
    email: email.trim().toLowerCase(),
    password: password,
    role: "individual",
  });

  return res.status(201).json(new ApiResponse(201, user, "User registered successfully"));
});

const registerTechnician = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const { fullName, email, password, registrationNumber, experience } = req.body;
  const imagePath = req.file?.path;

  if (!fullName?.trim() || !email?.trim() || !password?.trim() || !registrationNumber?.trim() || !experience) {
    throw new AppError(400, "All fields are required");
  }

  if (!imagePath) {
    throw new AppError(400, "PAN card image is required");
  }

  const uploadedImage = await uploadToCloudinary(imagePath);
  if (!uploadedImage) {
    throw new AppError(500, "Failed to upload PAN card");
  }

  const userExists = await User.findOne({ email: email.trim().toLowerCase() });
  const regExists = await Technician.findOne({ registrationNumber: registrationNumber.trim() });

  if (userExists) {
    throw new AppError(409, "Email is already registered");
  }
  if (regExists) {
    throw new AppError(409, "Technician with this registration number already exists");
  }

  const user = await User.create({
    name: fullName.trim(),
    email: email.trim().toLowerCase(),
    password: password,
    role: "technician",
  });

  const technician = await Technician.create({
    userId: user._id,
    registrationNumber: registrationNumber.trim(),
    panCardImageId: uploadedImage.public_id,
    panCardUrl: uploadedImage.secure_url,
    experience: Number(experience),
    status: "pending",
  });

  return res.status(201).json(new ApiResponse(201, { user, technician }, "Technician profile created. Pending admin verification."));
});

const registerBusinessUser = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const { fullName, email, password, companyName, registrationNumber, businessType } = req.body;
  const imagePath = req.file?.path;

  if (!fullName?.trim() || !email?.trim() || !password?.trim() || !registrationNumber?.trim() || !businessType?.trim() || !companyName?.trim()) {
    throw new AppError(400, "All fields are required");
  }

  if (!imagePath) {
    throw new AppError(400, "PAN card image is required");
  }

  const uploadedImage = await uploadToCloudinary(imagePath);
  if (!uploadedImage) {
    throw new AppError(500, "Failed to upload PAN card");
  }

  const userExists = await User.findOne({ email: email.trim().toLowerCase() });
  const regExists = await Business.findOne({ registrationNumber: registrationNumber.trim() });

  if (userExists) {
    throw new AppError(409, "Email is already registered");
  }
  if (regExists) {
    throw new AppError(409, "Business  with this registration number already exists");
  }
  const user = await User.create({
    name: fullName.trim(),
    email: email.trim().toLowerCase(),
    password: password,
    role: "business",
  });

  const business = await Business.create({
    companyName: companyName,
    userId: user._id,
    registrationNumber: registrationNumber.trim(),
    businessType: businessType,
    panCardImageId: uploadedImage.public_id,
    panCardImageUrl: uploadedImage.secure_url,
    status: "pending",
  });

  return res.status(201).json(new ApiResponse(201, { user, business }, "Business profile created. Pending admin verification"));
});

const logInUser = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const { email, password } = req.body;
  if (!email?.trim() || !password?.trim()) {
    throw new AppError(400, "All fields are required");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError(404, "User doesnt exist");
  }
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new AppError(401, "Password is incorrect");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
  const loggedUser = await User.findById(user._id);
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "strict" as const,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, loggedUser, "User logged in successfully"));
});

const logOutUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: undefined,
      },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "strict" as const,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, null, "User logged out"));
});

const resetPassword = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  if (!oldPassword?.trim() || !newPassword.trim() || !confirmNewPassword.trim()) {
    throw new AppError(400, "All fields are required");
  }
  if (newPassword !== confirmNewPassword) {
    throw new AppError(400, "Both passwords must match");
  }
  const user = await User.findById(req.user._id).select("+password");
  const isPasswordValid = await user.comparePassword(oldPassword);
  if (!isPasswordValid) {
    throw new AppError(401, "Password is incorrect");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res.status(201).json(new ApiResponse(201, "", "Password changed successfully"));
});

export { registerIndividualUser, registerTechnician, registerBusinessUser, logInUser, logOutUser, resetPassword };
