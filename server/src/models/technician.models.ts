import mongoose, { Document, Schema } from "mongoose";

export interface ITechnician extends Document {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  registrationNumber: string;
  panCardUrl: string;
  panCardImageId: string;
  experience: number;
  status?: "pending" | "verified" | "rejected";
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
  },
  { timestamps: true }
);

export const Technician = mongoose.model<ITechnician>("Technician", technicianSchema);
