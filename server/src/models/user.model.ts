import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "user" | "technician" | "admin";
  address?: string | null;
  profilePictureUrl?: string | null;
  profilePicturePublicId?: string | null;
  isVerified?: boolean;
  isDeactivated: boolean;
  refreshToken?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    role: {
      type: String,
      enum: ["user", "technician", "admin"],
      required: true,
    },
    address: {
      type: String,
      default: null,
    },
    profilePictureUrl: {
      type: String,
      default: null,
    },
    profilePicturePublicId: {
      type: String,
      default: null,
    },
    isDeactivated: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.index({ email: 1, phone: 1 });

export const User = mongoose.model<IUser>("User", userSchema);
