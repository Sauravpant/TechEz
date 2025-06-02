import mongoose, { Document, Schema } from "mongoose";

export interface IBusiness extends Document {
  _id: Schema.Types.ObjectId;
  companyName: string;
  userId: Schema.Types.ObjectId;
  registrationNumber: string;
  panCardImageId: string;
  panCardImageUrl: string;
  businessType: string;
  status?: "pending" | "verified" | "rejected";
}

const businessSchema = new Schema<IBusiness>(
  {
    companyName: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    registrationNumber: {
      type: String,
      required: true,
      unique:true
    },
    panCardImageId: {
      type: String,
      select: false,
    },
    panCardImageUrl: {
      type: String,
    },
    businessType: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Business = mongoose.model<IBusiness>("Business", businessSchema);
