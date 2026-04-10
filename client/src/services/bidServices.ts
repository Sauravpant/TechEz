import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types/api";

export interface CreateBidData {
  title: string;
  category: string;
  offeredPrice: number;
  description: string;
}

export async function createBid(data: CreateBidData): Promise<ApiResponse<null>> {
  const res = await api.post<ApiResponse<null>>("/bid/create-bid", data);
  return res.data;
}

