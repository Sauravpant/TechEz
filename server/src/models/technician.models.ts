import mongoose, { Document, Schema } from "mongoose";

export interface ITechnician extends Document {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  registrationNumber: string;
  panCardUrl: string;
  panCardImageId: string;
  experience: number;
  status?: "pending" | "verified" | "rejected";
  rate: number;
  unit: string;
}

const technicianSchema = new Schema<ITechnician>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    panCardImageId: {
      type: String,
      select: false,
    },
    panCardUrl: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    experience: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
    },
    unit: { type: String, enum: ["per_hour", "per_job"], default: "per_job" },
  },
  { timestamps: true }
);

export const Technician = mongoose.model<ITechnician>("Technician", technicianSchema);
