import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types/api";
import type { AuthUser } from "@/types/auth";

export async function getMyProfile(): Promise<ApiResponse<AuthUser>> {
  const res = await api.get<ApiResponse<AuthUser>>("/user/profile");
  return res.data;
}

export async function updateMyProfile(data: { name?: string; phone?: string; address?: string }): Promise<ApiResponse<AuthUser>> {
  const res = await api.patch<ApiResponse<AuthUser>>("/user/update-profile", data);
  return res.data;
}

export async function uploadMyProfilePicture(file: File): Promise<ApiResponse<string>> {
  const form = new FormData();
  form.append("profilePicture", file);
  const res = await api.patch<ApiResponse<string>>("/user/upload-profile-picture", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function deleteMyProfilePicture(): Promise<ApiResponse<null>> {
  const res = await api.delete<ApiResponse<null>>("/user/delete-profile-picture");
  return res.data;
}

