import mongoose, { Document, Schema } from "mongoose";

export interface IReviews extends Document {
  _id: Schema.Types.ObjectId;
  reviewerId: Schema.Types.ObjectId;
  technicianId: Schema.Types.ObjectId;
  comment: string;
  rating: number;
}

const reviewSchema = new Schema<IReviews>({
  reviewerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  technicianId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

export const Review = mongoose.model<IReviews>("Review", reviewSchema);
