import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ApiResponse } from "@/types/api";
import type { AuthUser } from "@/types/auth";
import { deleteMyProfilePicture, getMyProfile, updateMyProfile, uploadMyProfilePicture } from "@/services/userServices";
import { getApiErrorMessage } from "@/lib/errors";

export function useMyProfile() {
  return useQuery<ApiResponse<AuthUser>, unknown>({
    queryKey: ["me"],
    queryFn: getMyProfile,
  });
}

export function useUpdateMyProfile() {
  const qc = useQueryClient();
  return useMutation<ApiResponse<AuthUser>, unknown, { name?: string; phone?: string; address?: string }>({
    mutationFn: updateMyProfile,
    onSuccess: (data) => {
      toast.success(data.message || "Profile updated");
      qc.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (err: unknown) => {
      toast.error(getApiErrorMessage(err, "Failed to update profile"));
    },
  });
}

export function useUploadProfilePicture() {
  const qc = useQueryClient();
  return useMutation<ApiResponse<string>, unknown, { file: File }>({
    mutationFn: ({ file }) => uploadMyProfilePicture(file),
    onSuccess: (data) => {
      toast.success(data.message || "Profile picture updated");
      qc.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (err: unknown) => {
      toast.error(getApiErrorMessage(err, "Failed to upload picture"));
    },
  });
}

export function useDeleteProfilePicture() {
  const qc = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, void>({
    mutationFn: deleteMyProfilePicture,
    onSuccess: (data) => {
      toast.success(data.message || "Profile picture deleted");
      qc.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (err: unknown) => {
      toast.error(getApiErrorMessage(err, "Failed to delete picture"));
    },
  });
}

