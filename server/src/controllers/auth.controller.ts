import { Request, Response } from "express";
import { User, Iuser } from "../models/user.models.ts";
import OtpRequest from "../models/Otp.models.ts";
import { asyncHandler } from "../utils/AsyncHandler.ts";
import { AppError } from "../utils/AppError.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";
import { uploadToCloudinary } from "../utils/cloudinary.ts";
import { Technician } from "../models/technician.models.ts";
import { Business } from "../models/business.models.ts";
import sendMail from "../utils/nodemailer.ts";
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

const requestOtp = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const { email } = req.body;
  if (!email || !email.trim()) {
    throw new AppError(400, "Email is required");
  }
  const user = await User.findOne({ email: email });
  if (user) {
    throw new AppError(403, "User with above email already exists");
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await OtpRequest.findOneAndUpdate({ email: email.trim() }, { otp, createdAt: new Date() }, { upsert: true, new: true });
  await sendMail(email, otp);
  return res.status(200).json(new ApiResponse(200, email.trim(), "Otp sent to your email"));
});

const verifyOtp = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    throw new AppError(400, "Otp is required");
  }
  const user = await User.findOne({ email: email });
  if (user) {
    throw new AppError(403, "User with above email already exists");
  }
  const otpUser = await OtpRequest.findOne({ email: email });
  if (!otpUser) {
    throw new AppError(404, "Otp not found or expired");
  }

  if (otpUser.otp !== otp) {
    throw new AppError(400, "OTP is invalid");
  }
  const newUser = new User({
    email: email.trim(),
    emailVerified: true,
  });

  await newUser.save({ validateBeforeSave: false });
  await OtpRequest.deleteOne({ email: email.trim() });
  return res.status(200).json(new ApiResponse(200, newUser.email, "Email verified successfully"));
});
const registerIndividualUser = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const { fullName, email, password } = req.body;

  if (!fullName?.trim() || !email?.trim() || !password?.trim()) {
    throw new AppError(400, "All fields are required");
  }

  const emailUser = await User.findOne({ email: email.trim().toLowerCase() });
  if (!emailUser) {
    throw new AppError(400, "Enter the same email as during verification process");
  }

  if (!emailUser.emailVerified) {
    throw new AppError(400, "Please verify your email first before registration");
  }

  if (emailUser.password) {
    throw new AppError(409, "Email is already registered");
  }

  emailUser.name = fullName.trim();
  emailUser.password = password;
  emailUser.role = "individual";

  await emailUser.save();

  return res.status(201).json(new ApiResponse(201, emailUser, "User registered successfully"));
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

  const emailUser = await User.findOne({ email: email.trim().toLowerCase() });
  if (!emailUser) {
    throw new AppError(400, "Enter the same email as during verification process");
  }
  if (!emailUser.emailVerified) {
    throw new AppError(400, "Please verify your email first before registration");
  }
  if (emailUser.password) {
    throw new AppError(409, "Email is already registered");
  }

  const regExists = await Technician.findOne({ registrationNumber: registrationNumber.trim() });
  if (regExists) {
    throw new AppError(409, "Technician with this registration number already exists");
  }

  emailUser.name = fullName.trim();
  emailUser.password = password;
  emailUser.role = "technician";
  await emailUser.save();

  const technician = await Technician.create({
    userId: emailUser._id,
    registrationNumber: registrationNumber.trim(),
    panCardImageId: uploadedImage.public_id,
    panCardUrl: uploadedImage.secure_url,
    experience: Number(experience),
    status: "pending",
  });

  return res.status(201).json(new ApiResponse(201, { user: emailUser, technician }, "Technician profile created. Pending admin verification"));
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

  const emailUser = await User.findOne({ email: email.trim().toLowerCase() });
  if (!emailUser) {
    throw new AppError(400, "Enter the same email as during verification process");
  }
  if (!emailUser.emailVerified) {
    throw new AppError(400, "Please verify your email first before registration");
  }
  if (emailUser.password) {
    throw new AppError(409, "Email is already registered");
  }

  const regExists = await Business.findOne({ registrationNumber: registrationNumber.trim() });
  if (regExists) {
    throw new AppError(409, "Business with this registration number already exists");
  }

  emailUser.name = fullName.trim();
  emailUser.password = password;
  emailUser.role = "business";
  await emailUser.save();

  const business = await Business.create({
    companyName,
    userId: emailUser._id,
    registrationNumber: registrationNumber.trim(),
    businessType,
    panCardImageId: uploadedImage.public_id,
    panCardImageUrl: uploadedImage.secure_url,
    status: "pending",
  });

  return res.status(201).json(new ApiResponse(201, { user: emailUser, business }, "Business profile created. Pending admin verification"));
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

const uploadProfilePicture = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new AppError(404, "Access denied");
  }
  const imagePath = req.file?.path;
  if (!imagePath) {
    throw new AppError(400, "Image is required");
  }
  const uploadedImage = await uploadToCloudinary(imagePath);
  if (!uploadedImage) {
    throw new AppError(500, "Failed to upload image. Please try again.");
  }
  user.profilePictureUrl = uploadedImage.secure_url;
  user.profilePicturePublicId = uploadedImage.public_id;
  user.save();
  return res.status(200).json(new ApiResponse(200, user.profilePictureUrl, "Profile picture updated successfully"));
});

export {
  registerIndividualUser,
  registerTechnician,
  registerBusinessUser,
  logInUser,
  logOutUser,
  resetPassword,
  uploadProfilePicture,
  requestOtp,
  verifyOtp,
};
