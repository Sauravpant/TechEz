import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ApiResponse } from "@/types/api";
import { createBid, type CreateBidData } from "@/services/bidServices";
import { getApiErrorMessage } from "@/lib/errors";

export function useCreateBid() {
  return useMutation<ApiResponse<null>, unknown, CreateBidData>({
    mutationFn: createBid,
    onSuccess: (data) => toast.success(data.message || "Bid created"),
    onError: (err: unknown) => toast.error(getApiErrorMessage(err, "Failed to create bid")),
  });
}

