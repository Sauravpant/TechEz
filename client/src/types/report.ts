export interface UserReportItem {
  id: string;
  reason: string;
  details: string;
  createdAt: string | Date;
  totalReports: number;
  reportedTechnician: {
    id: string;
    name: string;
    profilePictureUrl?: string | null;
    phone: string;
  };
}

export interface TechnicianReportItem {
  id: string;
  reason: string;
  details: string;
  createdAt: string | Date;
  totalReports: number;
  reporter: {
    id: string;
    name: string;
    profilePictureUrl?: string | null;
    phone: string;
  };
}

export interface CreateReportData {
  reason: string;
  description: string;
}

