import z from "zod";
import { reportTechnicianSchema } from "../validators/report.validators";

export type ReportTechnician = z.infer<typeof reportTechnicianSchema>;

export interface TechnicianReports {
  id: string;
  reason: string;
  details: string;
  createdAt: Date;
  totalReports: number;
  reporter: {
    id: string;
    name: string;
    profilePictureUrl: string;
    phone: string;
  };
}

export interface UserReports {
  id: string;
  reason: string;
  details: string;
  createdAt: Date;
  totalReports: number;
  reportedTechnician: {
    id: string;
    name: string;
    profilePictureUrl: string;
    phone: string;
  };
}
