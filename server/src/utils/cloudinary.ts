import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_SECRET_KEY!,
});

export const uploadToCloudinary = async (filePath: any): Promise<any> => {
  try {
    if (!filePath) return null;
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      folder: "chat-app",
    });
    fs.unlinkSync(filePath);
    return response;
  } catch (err) {
    fs.existsSync(filePath) && fs.unlinkSync(filePath);
    throw null;
  }
};

export const deleteFromCloudinary = async (publicId: any): Promise<any> => {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "auto",
    });
  } catch (error) {
    throw null;
  }
};