class AppError extends Error {
  statusCode: number;
  errors: string[];
  success: boolean;
  constructor(statusCode: number, message: string | "Something went wrong", errors?: string[], stack?: string | "") {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.message = message;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { AppError };
