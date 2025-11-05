import mongoose, { Schema, Document } from "mongoose";

export interface IReport extends Document {
  _id: mongoose.Types.ObjectId;
  reporter: mongoose.Types.ObjectId;
  reportedUser: mongoose.Types.ObjectId;
  reason: string;
  details?: string;
  createdAt: Date;
  updatedAt: Date;
}

const reportSchema = new Schema<IReport>(
  {
    reporter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    reportedUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    reason: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Report = mongoose.model<IReport>("Report", reportSchema);
