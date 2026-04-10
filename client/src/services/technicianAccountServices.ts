import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types/api";
import type { AuthUser } from "@/types/auth";

export interface UpdateTechnicianProfileData {
  name?: string;
  address?: string;
  phone?: string;
  experience?: number;
  category?: string;
  bio?: string;
  description?: string;
}

export async function updateTechnicianProfile(data: UpdateTechnicianProfileData): Promise<ApiResponse<AuthUser>> {
  const res = await api.patch<ApiResponse<AuthUser>>("/technician/update-profile", data);
  return res.data;
}

export async function uploadVerificationDocument(file: File): Promise<ApiResponse<string>> {
  const form = new FormData();
  form.append("verificationDocument", file);
  const res = await api.patch<ApiResponse<string>>("/technician/upload-verification-document", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function deleteVerificationDocument(): Promise<ApiResponse<null>> {
  const res = await api.patch<ApiResponse<null>>("/technician/delete-verification-document");
  return res.data;
}

