import mongoose, { Schema, Document } from "mongoose";

export interface IOtpRequest extends Document {
  email: string;
  otp: string;
  expiresAt: Date;
  createdAt: Date;
}

const otpRequestSchema = new Schema<IOtpRequest>({
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now, expires: 600 },
});
const OtpRequest = mongoose.model<IOtpRequest>("OtpRequest", otpRequestSchema);
export default OtpRequest;
