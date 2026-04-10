import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ApiResponse } from "@/types/api";
import type { AuthUser } from "@/types/auth";
import { deleteVerificationDocument, type UpdateTechnicianProfileData, updateTechnicianProfile, uploadVerificationDocument } from "@/services/technicianAccountServices";
import { getApiErrorMessage } from "@/lib/errors";

export function useUpdateTechnicianProfile() {
  const qc = useQueryClient();
  return useMutation<ApiResponse<AuthUser>, unknown, UpdateTechnicianProfileData>({
    mutationFn: updateTechnicianProfile,
    onSuccess: (data) => {
      toast.success(data.message || "Profile updated");
      qc.invalidateQueries({ queryKey: ["me"] });
      qc.invalidateQueries({ queryKey: ["technician"] });
      qc.invalidateQueries({ queryKey: ["technicians"] });
    },
    onError: (err: unknown) => toast.error(getApiErrorMessage(err, "Failed to update technician profile")),
  });
}

export function useUploadVerificationDocument() {
  const qc = useQueryClient();
  return useMutation<ApiResponse<string>, unknown, { file: File }>({
    mutationFn: ({ file }) => uploadVerificationDocument(file),
    onSuccess: (data) => {
      toast.success(data.message || "Document uploaded");
      qc.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (err: unknown) => toast.error(getApiErrorMessage(err, "Failed to upload document")),
  });
}

export function useDeleteVerificationDocument() {
  const qc = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, void>({
    mutationFn: deleteVerificationDocument,
    onSuccess: (data) => {
      toast.success(data.message || "Document deleted");
      qc.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (err: unknown) => toast.error(getApiErrorMessage(err, "Failed to delete document")),
  });
}

