import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types/api";
import type { CreateReviewData, TechnicianReviewsResponse, UpdateReviewData, UserReviewsResponse } from "@/types/review";

export async function createReview(technicianId: string, data: CreateReviewData): Promise<ApiResponse<null>> {
  const res = await api.post<ApiResponse<null>>(`/review/review-technician/${technicianId}`, data);
  return res.data;
}

export async function updateReview(reviewId: string, data: UpdateReviewData): Promise<ApiResponse<null>> {
  const res = await api.patch<ApiResponse<null>>(`/review/update-review/${reviewId}`, data);
  return res.data;
}

export async function deleteReview(reviewId: string): Promise<ApiResponse<null>> {
  const res = await api.delete<ApiResponse<null>>(`/review/delete-review/${reviewId}`);
  return res.data;
}

export async function getUserReviews(): Promise<ApiResponse<UserReviewsResponse>> {
  const res = await api.get<ApiResponse<UserReviewsResponse>>(`/review/user-reviews`);
  return res.data;
}

export async function getTechnicianReviews(): Promise<ApiResponse<TechnicianReviewsResponse>> {
  const res = await api.get<ApiResponse<TechnicianReviewsResponse>>(`/review/technician-reviews`);
  return res.data;
}

