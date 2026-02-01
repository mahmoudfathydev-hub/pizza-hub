// Simple in-memory rate limiting for upload endpoints
// In production, consider using Redis or a dedicated rate limiting service

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export interface RateLimitOptions {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
}

export const createRateLimit = (options: RateLimitOptions) => {
  return (identifier: string): { allowed: boolean; resetTime?: number } => {
    const now = Date.now();
    const key = identifier;
    const existing = rateLimitStore.get(key);

    // Clean up expired entries
    if (existing && now > existing.resetTime) {
      rateLimitStore.delete(key);
    }

    const current = rateLimitStore.get(key) || { count: 0, resetTime: now + options.windowMs };

    if (current.count >= options.maxRequests) {
      return { allowed: false, resetTime: current.resetTime };
    }

    current.count++;
    rateLimitStore.set(key, current);

    return { allowed: true };
  };
};

// Rate limit for upload endpoints: 5 uploads per minute per IP
export const uploadRateLimit = createRateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 5,
});

// Rate limit for general API endpoints: 100 requests per minute per IP
export const apiRateLimit = createRateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100,
});

// Cleanup function to prevent memory leaks (call this periodically)
export const cleanupRateLimit = () => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
};

// Auto-cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimit, 5 * 60 * 1000);
}
