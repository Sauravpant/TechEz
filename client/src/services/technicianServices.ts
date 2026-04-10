import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types/api";
import type { GetAllTechniciansFilter, GetAllTechniciansResponse, TechnicianDetails } from "@/types/technician";

export async function getAllTechnicians(filter: GetAllTechniciansFilter): Promise<ApiResponse<GetAllTechniciansResponse>> {
  const res = await api.get<ApiResponse<GetAllTechniciansResponse>>("/technician/get-all-technicians", {
    params: filter,
  });
  return res.data;
}

export async function getTechnicianById(technicianId: string): Promise<ApiResponse<TechnicianDetails>> {
  const res = await api.get<ApiResponse<TechnicianDetails>>(`/technician/${technicianId}`);
  return res.data;
}

