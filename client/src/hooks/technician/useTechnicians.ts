import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/types/api";
import type { GetAllTechniciansFilter, GetAllTechniciansResponse, TechnicianDetails } from "@/types/technician";
import { getAllTechnicians, getTechnicianById } from "@/services/technicianServices";

export function useTechnicians(filter: GetAllTechniciansFilter) {
  return useQuery<ApiResponse<GetAllTechniciansResponse>, unknown>({
    queryKey: ["technicians", filter],
    queryFn: () => getAllTechnicians(filter),
  });
}

export function useTechnicianDetails(technicianId: string) {
  return useQuery<ApiResponse<TechnicianDetails>, unknown>({
    queryKey: ["technician", technicianId],
    queryFn: () => getTechnicianById(technicianId),
    enabled: !!technicianId,
  });
}

