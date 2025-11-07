import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  technician: mongoose.Types.ObjectId;
  title: String;
  description: String;
  category: mongoose.Types.ObjectId;
  completedAt?: Date;
  initialPrice: number;
  status: "pending" | "accepted" | "completed" | "cancelled";
  bookingMethod: "bid" | "manual";
  finalPrice: number;
  platformFee: number;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
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
    completedAt: {
      type: Date,
    },
    bookingMethod: {
      type: String,
      enum: ["bid", "manual"],
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "completed", "cancelled"],
      default: "pending",
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
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    initialPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    finalPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    platformFee: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.model<IBooking>("Booking", bookingSchema);

// Pre-save hook to calculate platform fee
bookingSchema.pre<IBooking>("save", function (next) {
  if (this.isNew || this.isModified("status")) {
    if (this.status === "completed") {
      this.platformFee = this.finalPrice * 0.1;
    } else {
      this.platformFee = 0;
    }
  }
  next();
});
