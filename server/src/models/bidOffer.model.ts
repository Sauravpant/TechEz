import mongoose, { Schema, Document } from "mongoose";

export interface IBidOffer extends Document {
  _id: mongoose.Types.ObjectId;
  bid: mongoose.Types.ObjectId;
  technician: mongoose.Types.ObjectId;
  amount: number;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const offerSchema = new Schema<IBidOffer>(
  {
    bid: {
      type: Schema.Types.ObjectId,
      ref: "Bid",
      required: true,
      index: true,
    },
    technician: {
      type: Schema.Types.ObjectId,
      ref: "Technician",
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const BidOffer = mongoose.model<IBidOffer>("BidOffer", offerSchema);
