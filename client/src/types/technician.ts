export interface TechnicianListItem {
  id: string;
  name: string;
  address?: string | null;
  isVerified: boolean;
  profilePictureUrl?: string | null;
  experience: number;
  category: string;
  bio: string;
  description: string;
  registeredAt: string | Date;
}

export interface GetAllTechniciansResponse {
  technicians: TechnicianListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TechnicianReviewSummaryItem {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt: string | Date;
  user: {
    id: string;
    name: string;
    profilePictureUrl?: string | null;
  };
}

export interface TechnicianDetails {
  id: string;
  name: string;
  address?: string | null;
  isVerified: boolean;
  profilePictureUrl?: string | null;
  experience: number;
  category: string;
  bio: string;
  description: string;
  registeredAt: string | Date;
  totalBookings: number;
  averageRating: number;
  totalReviews: number;
  reviews: TechnicianReviewSummaryItem[];
}

export interface GetAllTechniciansFilter {
  name?: string;
  category?: string;
  experience?: number;
  address?: string;
  verificationType?: "license" | "manual";
  page?: number;
  limit?: number;
}

