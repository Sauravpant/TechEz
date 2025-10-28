import mongoose, { Schema, Document } from "mongoose";

export interface IBid extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  title: string;
  description: string;
  offeredPrice: number;
  finalPrice?: number;
  status: "open" | "closed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const bidSchema = new Schema<IBid>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    offeredPrice: {
      type: Number,
      required: true,
    },
    finalPrice: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["open", "closed", "cancelled"],
      default: "open",
    },
  },
  { timestamps: true }
);

export const Bid = mongoose.model<IBid>("Bid", bidSchema);
