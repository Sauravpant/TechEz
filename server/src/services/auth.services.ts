import bcrypt from "bcrypt";
import { ChangePassword, ForgotPassword, RegisterTechnician, RegisterUser, TechnicianInfo, TechnicianLogin, UserLogin } from "../types/auth.types";
import { User } from "../models/user.model";
import mongoose from "mongoose";
import { AppError } from "../utils/app-error";
import { Technician } from "../models/technician.model";
import { uploadToCloudinary } from "../utils/cloudinary";
import { Category } from "../models/category.model";
import { generateAccessToken, generateRefreshToken } from "../utils/token";
import OtpRequest from "../models/otp.model";
import sendMail from "../utils/nodemailer";
import { emailQueue } from "../jobs/queues/emailQueue";
import logger from "../utils/logger";

const SALT_ROUNDS: number = Number(process.env.SALT_ROUNDS) || 10;

// Register User Service
export const registerUserService = async (data: RegisterUser): Promise<void> => {
  const userExists = await User.findOne({ $or: [{ email: data.email }, { phone: data.phone }] });
  if (userExists) {
    throw new AppError(400, "User with given email or phone number already exists");
  }
  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
  await User.create({ ...data, password: hashedPassword, role: "user" });

  // Send Welcome Email using BullMQ for background processing
  const subject = "Welcome to TechEz";
  const text = "Congratulations! Your account has been successfully created. Please verify your email to get started.";
  await emailQueue.add("sendEmail", { email: data.email, subject, text });
};

// Register Technician Service
export const registerTechnicianService = async (data: RegisterTechnician): Promise<void> => {
  const userExists = await User.findOne({ $or: [{ email: data.email }, { phone: data.phone }] });
  if (userExists) {
    throw new AppError(400, "User with given email or phone number already exists");
  }
  const categoryExists = await Category.findOne({ name: data.category });
  if (!categoryExists) {
    throw new AppError(400, "Category does not exist");
  }
  if (data.registrationNumber) {
    const regNumberExists = await Technician.findOne({ registrationNumber: data.registrationNumber });
    if (regNumberExists) {
      throw new AppError(400, "Technician with given registration number already exists");
    }
  }
  /*
  Check if the technician has uploaded a document 
  If document is provided, upload it to Cloud and get the URL and public ID
  */

  let uploadedImage: any = null;
  if (data.document && data.document.file && data.document.filename) {
    uploadedImage = await uploadToCloudinary(data.document.file, data.document.filename);
  }
  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  //Using Transaction to ensure the Atomicity according to the ACID properties
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
  const user = await User.create([{ name: data.name, email: data.email, password: hashedPassword, phone: data.phone, role: "technician" }], { session });
    await Technician.create(
[      {
        user: user[0]._id,
        experience: data.experience,
        category: categoryExists._id,
        registrationNumber: data?.registrationNumber || null,
        documentUrl: uploadedImage ? uploadedImage.secure_url : null,
        documentPublicId: uploadedImage ? uploadedImage.public_id : null,
        bio: data.bio,
        description: data.description,
      }],
      { session }
    );
    await session.commitTransaction();
  } catch (err: any) {
    await session.abortTransaction();
    logger.error(`Error registering technician: ${err.message}`);
    throw new AppError(500, "Internal Server Error");
  } finally {
    session.endSession();
  }
  const subject = "Welcome to TechEz as a Technician";
  const text = "Congratulations! Your technician account has been successfully created. Please verify your email to get started.";
  await emailQueue.add("sendEmail", { email: data.email, subject, text });
};

// Login Service
export const loginService = async (email: string, password: string): Promise<UserLogin | TechnicianLogin> => {
  const userInfo = await User.findOne({ email: email });
  if (!userInfo) {
    throw new AppError(400, "Email doesnt exist");
  }
  const isPasswordValid = await bcrypt.compare(password, userInfo.password);
  if (!isPasswordValid) {
    throw new AppError(400, "Incorrect password");
  }
  const accessToken = generateAccessToken(userInfo._id.toString(), userInfo.role);
  const refreshToken = generateRefreshToken(userInfo._id.toString(), userInfo.role);
  userInfo.refreshToken = refreshToken;
  await userInfo.save();
  const user = {
    id: userInfo._id.toString(),
    name: userInfo.name,
    email: userInfo.email,
    phone: userInfo.phone,
    profilePictureUrl: userInfo.profilePictureUrl,
    address: userInfo.address,
    role: userInfo.role,
    isVerified: userInfo.isVerified,
    isDeactivated: userInfo.isDeactivated,
    createdAt: userInfo.createdAt,
    updatedAt: userInfo.updatedAt,
  };

  if (userInfo.role === "technician") {
    const technicianInfo = await Technician.findOne({ user: userInfo._id }).populate<{ category: { name: string } }>("category", "name");
    const technician: TechnicianInfo = {
      ...user,
      technicianId: technicianInfo?._id.toString(),
      user: technicianInfo.user.toString(),
      category: technicianInfo.category.name,
      experience: technicianInfo.experience,
      bio: technicianInfo.bio,
      description: technicianInfo.description,
      registrationNumber: technicianInfo.registrationNumber,
      documentUrl: technicianInfo.documentUrl,
      status: technicianInfo.status,
    };
    return { accessToken, refreshToken, technician };
  }

  return { accessToken, refreshToken,user };
};

// Logout Service
export const logoutService = async (userId: string): Promise<void> => {
  const userInfo = await User.findById(userId);
  if (!userInfo) {
    throw new AppError(404, "User not found");
  }
  userInfo.refreshToken = null;
  await userInfo.save();
};

export const sendOtpService = async (email: string): Promise<void> => {
  const user = await User.findOne({ email }).select("email");
  if (!user) {
    throw new AppError(404, "User doesn't exist");
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOtp = await bcrypt.hash(otp, SALT_ROUNDS);
  await OtpRequest.deleteOne({ email });
  await OtpRequest.create({
    email,
    otp: hashedOtp,
  });
  const subject = "Your OTP for Password Reset";
  const text = `Use the following OTP to reset your password. Your OTP is ${otp}`;
  await sendMail({ email: user.email, subject, text });
};

export const changePasswordService = async (body: ChangePassword, _id: string): Promise<void> => {
  const user = await User.findById(_id).select("password");
  if (!user) {
    throw new AppError(404, "User not found");
  }
  const isMatch = await bcrypt.compare(body.oldPassword, user.password);
  if (!isMatch) {
    throw new AppError(401, "Enter the correct password to continue");
  }
  const hashedPassword = await bcrypt.hash(body.newPassword, SALT_ROUNDS);
  await User.findByIdAndUpdate(_id, { password: hashedPassword });
};

export const forgotPasswordService = async (data: ForgotPassword): Promise<void> => {
  const user = await User.findOne({ email: data.email });
  if (!user) {
    throw new AppError(404, "Invalid email");
  }
  const storedOtp = await OtpRequest.findOne({ email: data.email });
  if (!storedOtp) {
    throw new AppError(404, "Otp not found or expired");
  }
  const isOtpMatch = await bcrypt.compare(data.otp, storedOtp.otp);
  if (!isOtpMatch) {
    throw new AppError(400, "Invalid Otp. Enter the correct one");
  }
  if (data.newPassword !== data.confirmNewPassword) {
    throw new AppError(400, "Both passwords must match");
  }
  const hashedPassword = await bcrypt.hash(data.newPassword, SALT_ROUNDS);
  user.password = hashedPassword;
  await user.save();
  OtpRequest.deleteOne({ email: data.email });
};
