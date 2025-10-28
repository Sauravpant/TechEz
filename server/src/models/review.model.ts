import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  _id: mongoose.Types.ObjectId;
  booking: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  technician: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    booking: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    technician: {
      type: Schema.Types.ObjectId,
      ref: "Technician",
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Review = mongoose.model<IReview>("Review", reviewSchema);
