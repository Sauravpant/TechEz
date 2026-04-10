export interface UserReviewItem {
  id: string;
  technician: {
    technicianId: string;
    userId: string;
    name: string;
    email: string;
    phone: string;
    profilePictureUrl?: string | null;
  };
  rating: number;
  comment?: string | null;
  createdAt: string | Date;
}

export interface UserReviewsResponse {
  totalReviews: number;
  reviews: UserReviewItem[];
}

export interface TechnicianReviewItem {
  id: string;
  technician: string;
  rating: number;
  comment?: string | null;
  createdAt: string | Date;
  user: {
    userId: string;
    name: string;
    email: string;
    phone: string;
    profilePictureUrl?: string | null;
  };
}

export interface TechnicianReviewsResponse {
  averageRating: number | null;
  totalReviews: number;
  reviews: TechnicianReviewItem[];
}

export interface CreateReviewData {
  rating: number;
  comment?: string;
}

export interface UpdateReviewData {
  rating?: number;
  comment?: string;
}

