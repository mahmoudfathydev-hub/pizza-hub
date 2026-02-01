// Standardized response utilities for consistent error handling across server actions

export interface ServerActionResponse<T = any> {
  status: number;
  message?: string;
  error?: Record<string, string[]>;
  data?: T;
  formData?: FormData;
}

export interface PaginationResponse<T> extends ServerActionResponse<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Standard success response
export const createSuccessResponse = <T = any>(
  data?: T,
  message?: string,
  status: number = 200
): ServerActionResponse<T> => ({
  status,
  message,
  data,
});

// Standard error response
export const createErrorResponse = (
  message: string,
  status: number = 500,
  error?: Record<string, string[]>
): ServerActionResponse => ({
  status,
  message,
  error,
});

// Validation error response
export const createValidationErrorResponse = (
  error: Record<string, string[]>
): ServerActionResponse => ({
  status: 400,
  message: "Validation failed",
  error,
});

// Not found error response
export const createNotFoundResponse = (resource: string): ServerActionResponse => ({
  status: 404,
  message: `${resource} not found`,
});

// Unauthorized error response
export const createUnauthorizedResponse = (message?: string): ServerActionResponse => ({
  status: 401,
  message: message || "Unauthorized access",
});

// Forbidden error response
export const createForbiddenResponse = (message?: string): ServerActionResponse => ({
  status: 403,
  message: message || "Access forbidden",
});

// Conflict error response
export const createConflictResponse = (message: string): ServerActionResponse => ({
  status: 409,
  message,
});
