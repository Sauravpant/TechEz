export interface ApiResponse<T> {
  success: boolean;
  statusCode: number | string;
  message: string;
  data: T;
}

