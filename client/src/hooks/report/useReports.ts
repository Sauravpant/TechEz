import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ApiResponse } from "@/types/api";
import type { CreateReportData, TechnicianReportItem, UserReportItem } from "@/types/report";
import { deleteReport, getTechnicianReports, getUserReports, reportTechnician } from "@/services/reportServices";
import { getApiErrorMessage } from "@/lib/errors";

export function useUserReports() {
  return useQuery<ApiResponse<UserReportItem[]>, unknown>({
    queryKey: ["userReports"],
    queryFn: getUserReports,
  });
}

export function useTechnicianReports() {
  return useQuery<ApiResponse<TechnicianReportItem[]>, unknown>({
    queryKey: ["technicianReports"],
    queryFn: getTechnicianReports,
  });
}

export function useReportTechnician() {
  const qc = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, { technicianId: string; data: CreateReportData }>({
    mutationFn: ({ technicianId, data }) => reportTechnician(technicianId, data),
    onSuccess: (data) => {
      toast.success(data.message || "Reported");
      qc.invalidateQueries({ queryKey: ["userReports"] });
      qc.invalidateQueries({ queryKey: ["technicianReports"] });
    },
    onError: (err: unknown) => toast.error(getApiErrorMessage(err, "Failed to report technician")),
  });
}

export function useDeleteReport() {
  const qc = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, { reportId: string }>({
    mutationFn: ({ reportId }) => deleteReport(reportId),
    onSuccess: (data) => {
      toast.success(data.message || "Deleted");
      qc.invalidateQueries({ queryKey: ["userReports"] });
      qc.invalidateQueries({ queryKey: ["technicianReports"] });
    },
    onError: (err: unknown) => toast.error(getApiErrorMessage(err, "Failed to delete report")),
  });
}

