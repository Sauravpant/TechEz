import mongoose, { Schema, Document } from "mongoose";

export interface ITechnician extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  experience: number;
  registrationNumber?: string;
  documentUrl?: string;
  documentPublicId?: string;
  status: "pending" | "approved" | "rejected";
  bio: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const technicianSchema = new Schema<ITechnician>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    registrationNumber: {
      type: String,
      unique: true,
    },
    documentUrl: {
      type: String,
    },
    documentPublicId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    bio: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Technician = mongoose.model<ITechnician>("Technician", technicianSchema);
