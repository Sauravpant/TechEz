import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "user" | "technician" | "admin";
  address?: string;
  profilePictureUrl?: string;
  profilePicturePublicId?: string;
  isDeactivated: boolean;
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
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "technician", "admin"],
      required: true,
    },
    address: {
      type: String,
    },
    profilePictureUrl: {
      type: String,
    },
    profilePicturePublicId: {
      type: String,
    },
    isDeactivated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
