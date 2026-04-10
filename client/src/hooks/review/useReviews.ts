import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ApiResponse } from "@/types/api";
import type { CreateReviewData, TechnicianReviewsResponse, UpdateReviewData, UserReviewsResponse } from "@/types/review";
import { createReview, deleteReview, getTechnicianReviews, getUserReviews, updateReview } from "@/services/reviewServices";
import { getApiErrorMessage } from "@/lib/errors";

export function useUserReviews() {
  return useQuery<ApiResponse<UserReviewsResponse>, unknown>({
    queryKey: ["userReviews"],
    queryFn: getUserReviews,
  });
}

export function useTechnicianReviews() {
  return useQuery<ApiResponse<TechnicianReviewsResponse>, unknown>({
    queryKey: ["technicianReviews"],
    queryFn: getTechnicianReviews,
  });
}

export function useCreateReview() {
  const qc = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, { technicianId: string; data: CreateReviewData }>({
    mutationFn: ({ technicianId, data }) => createReview(technicianId, data),
    onSuccess: (data) => {
      toast.success(data.message || "Review submitted");
      qc.invalidateQueries({ queryKey: ["userReviews"] });
      qc.invalidateQueries({ queryKey: ["technician"] });
      qc.invalidateQueries({ queryKey: ["technicians"] });
    },
    onError: (err: unknown) => toast.error(getApiErrorMessage(err, "Failed to submit review")),
  });
}

export function useUpdateReview() {
  const qc = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, { reviewId: string; data: UpdateReviewData }>({
    mutationFn: ({ reviewId, data }) => updateReview(reviewId, data),
    onSuccess: (data) => {
      toast.success(data.message || "Review updated");
      qc.invalidateQueries({ queryKey: ["userReviews"] });
      qc.invalidateQueries({ queryKey: ["technicianReviews"] });
    },
    onError: (err: unknown) => toast.error(getApiErrorMessage(err, "Failed to update review")),
  });
}

export function useDeleteReview() {
  const qc = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, { reviewId: string }>({
    mutationFn: ({ reviewId }) => deleteReview(reviewId),
    onSuccess: (data) => {
      toast.success(data.message || "Review deleted");
      qc.invalidateQueries({ queryKey: ["userReviews"] });
      qc.invalidateQueries({ queryKey: ["technicianReviews"] });
    },
    onError: (err: unknown) => toast.error(getApiErrorMessage(err, "Failed to delete review")),
  });
}

