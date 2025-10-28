import jwt from "jsonwebtoken";

export const generateAccessToken = (userId: string, role: string): string => {
  const payload = { userId, role };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "1h" });
};

export const generateRefreshToken = (userId: string, role: string): string => {
  const payload = { userId, role };
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "7d" });
};
