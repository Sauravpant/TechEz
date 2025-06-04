import mongoose, { Document, Schema } from "mongoose";

export interface IBooking extends Document {
  userId: mongoose.Types.ObjectId;
  technicianId: mongoose.Types.ObjectId;
  serviceType: string;
  address: string;
  requestedDate: Date;
  isBusiness: boolean;
  price:number;
  isPaid:boolean;
  paidAt:Date;
  status: "pending" | "accepted" | "completed" | "rejected";
  paymentStatus: "unpaid" | "paid";
  createdAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    technicianId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    requestedDate: {
      type: Date,
      required: true,
    },
    isBusiness: {
      type: Boolean,
      default: false,
    },
    price:{
      Number,
      required:true
    },
    isPaid:{
      type:Boolean,
      default:false
    },
    paidAt:{
      type:Date
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "completed", "rejected"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    }
  },
  { timestamps: true }
);

export const Booking = mongoose.model<IBooking>("Booking", bookingSchema);
