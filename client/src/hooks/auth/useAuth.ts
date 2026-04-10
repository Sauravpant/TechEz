import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ApiResponse } from "@/types/api";
import type { ChangePasswordData } from "@/types/auth";
import { changePassword, deactivateAccount } from "@/services/authServices";
import { getApiErrorMessage } from "@/lib/errors";

export function useChangePassword() {
  return useMutation<ApiResponse<null>, unknown, ChangePasswordData>({
    mutationFn: changePassword,
    onSuccess: (data) => {
      toast.success(data.message || "Password changed successfully");
    },
    onError: (err: unknown) => {
      toast.error(getApiErrorMessage(err, "Failed to change password"));
    },
  });
}

export function useDeactivateAccount() {
  const qc = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, void>({
    mutationFn: deactivateAccount,
    onSuccess: () => {
      qc.clear();
      toast.success("Successfully logged out");
    },
    onError: (err: unknown) => {
      toast.error(getApiErrorMessage(err, "Failed to deactivate account"));
    },
  });
}
