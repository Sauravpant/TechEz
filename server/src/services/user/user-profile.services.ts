import { User } from "../../models/user.model";
import { User as UserResponse } from "../../types/auth.types";
import { UpdateUserProfile } from "../../types/user/user-profile.types";
import { AppError } from "../../utils/app-error";
import { deleteFromCloudinary, uploadToCloudinary } from "../../utils/cloudinary";

export const updateUserProfileService = async (userId: string, data: UpdateUserProfile): Promise<UserResponse> => {
  let updateData: UpdateUserProfile = {};

  if (data.name !== undefined) updateData.name = data.name;
  if (data.phone !== undefined) updateData.phone = data.phone;
  if (data.address !== undefined) updateData.address = data.address;

  const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

  if (!user) {
    throw new AppError(404, "User not found");
  }
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    profilePictureUrl: user.profilePictureUrl,
    address: user.address,
    role: user.role,
    isVerified: user.isVerified,
    isDeactivated: user.isDeactivated,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const uploadUserProfilePictureService = async (data: { fileBuffer: Buffer; fileName: string; _id: string }): Promise<string> => {
  const user = await User.findById(data._id);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (user.profilePicturePublicId) {
    await deleteFromCloudinary(user.profilePicturePublicId);
  }

  const result = await uploadToCloudinary(data.fileBuffer, data.fileName);
  if (!result) {
    throw new AppError(500, "Failed to upload image");
  }
  user.profilePictureUrl = result.secure_url;
  user.profilePicturePublicId = result.public_id;

  await user.save();

  return user.profilePictureUrl!;
};

export const deleteUserProfilePictureService = async (userId: string): Promise<void> => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (user.profilePicturePublicId) {
    await deleteFromCloudinary(user.profilePicturePublicId);
  }

  user.profilePictureUrl = null;
  user.profilePicturePublicId = null;

  await user.save();
};

export const getUserProfileService = async (userId: string): Promise<UserResponse> => {
  const user = await User.findById(userId).lean();
  if (!user) {
    throw new AppError(404, "User not found");
  }

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    profilePictureUrl: user.profilePictureUrl,
    address: user.address,
    role: user.role,
    isVerified: user.isVerified,
    isDeactivated: user.isDeactivated,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

