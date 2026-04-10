import type { ApiResponse } from "@/types/api";
import type { AuthUser, ChangePasswordData, ForgotPasswordData, LoginData, RegisterTechnicianData, RegisterUserData } from "@/types/auth";
import { api } from "@/lib/axios";

type LoginPayload = { user?: AuthUser; technician?: AuthUser };

export async function registerUser(data: RegisterUserData): Promise<ApiResponse<null>> {
  const res = await api.post<ApiResponse<null>>("/auth/register-user", data);
  return res.data;
}

export async function registerTechnician(payload: {
  data: RegisterTechnicianData;
  profilePicture: File;
  verificationDocument?: File | null;
}): Promise<ApiResponse<null>> {
  const form = new FormData();
  Object.entries(payload.data).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    form.append(k, String(v));
  });
  form.append("profilePicture", payload.profilePicture);
  if (payload.verificationDocument) form.append("verificationDocument", payload.verificationDocument);

  const res = await api.post<ApiResponse<null>>("/auth/register-technician", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function login(data: LoginData): Promise<AuthUser> {
  const res = await api.post<ApiResponse<LoginPayload>>("/auth/login", data);
  const payload = res.data.data;
  const user = payload.user ?? payload.technician;
  if (!user) throw new Error("Invalid login response");
  return user;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export async function sendOtp(email: string): Promise<ApiResponse<null>> {
  const res = await api.post<ApiResponse<null>>("/auth/send-otp", { email });
  return res.data;
}

export async function forgotPassword(data: ForgotPasswordData): Promise<ApiResponse<null>> {
  const res = await api.patch<ApiResponse<null>>("/auth/forgot-password", data);
  return res.data;
}

export async function changePassword(data: ChangePasswordData): Promise<ApiResponse<null>> {
  const res = await api.patch<ApiResponse<null>>("/auth/change-password", data);
  return res.data;
}

export async function deactivateAccount(): Promise<ApiResponse<null>> {
  const res = await api.patch<ApiResponse<null>>("/auth/deactivate-account");
  return res.data;
}

export async function getSessionProfile(): Promise<AuthUser> {
  const res = await api.get<ApiResponse<AuthUser>>("/user/profile");
  return res.data.data;
}
