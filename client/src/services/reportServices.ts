import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types/api";
import type { CreateReportData, TechnicianReportItem, UserReportItem } from "@/types/report";

export async function reportTechnician(technicianId: string, data: CreateReportData): Promise<ApiResponse<null>> {
  const res = await api.post<ApiResponse<null>>(`/report/report-technician/${technicianId}`, data);
  return res.data;
}

export async function deleteReport(reportId: string): Promise<ApiResponse<null>> {
  const res = await api.delete<ApiResponse<null>>(`/report/delete-report/${reportId}`);
  return res.data;
}

export async function getUserReports(): Promise<ApiResponse<UserReportItem[]>> {
  const res = await api.get<ApiResponse<UserReportItem[]>>(`/report/user-reports`);
  return res.data;
}

export async function getTechnicianReports(): Promise<ApiResponse<TechnicianReportItem[]>> {
  const res = await api.get<ApiResponse<TechnicianReportItem[]>>(`/report/technician-reports`);
  return res.data;
}

