import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface Iuser extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: string;
  refreshToken: string;
  comparePassword(password: String): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}
const userSchema = new Schema<Iuser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    refreshToken: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "individual", "technician", "business"],
    },
  },
  { timestamps: true }
);

userSchema.pre<Iuser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});
userSchema.methods.comparePassword = async function (userPassword: string) {
  return await bcrypt.compare(userPassword, this.password);
};

userSchema.methods.generateAccessToken = function (): string {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: "2h",
    }
  );
};

userSchema.methods.generateRefreshToken = function (): string {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: "10d",
    }
  );
};
export const User = mongoose.model<Iuser>("User", userSchema);
