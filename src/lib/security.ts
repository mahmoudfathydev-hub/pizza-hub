// Security utilities for XSS prevention, input sanitization, and security headers

// XSS Prevention - Basic HTML sanitization
export const sanitizeHtml = (dirty: string): string => {
  if (typeof dirty !== "string") return "";

  // Basic HTML sanitization - remove potentially dangerous elements
  return dirty
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "") // Remove scripts
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "") // Remove iframes
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "") // Remove objects
    .replace(/<embed\b[^>]*>/gi, "") // Remove embeds
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, "") // Remove event handlers
    .replace(/<[^>]*>/g, (match) => {
      // Allow only safe tags
      const allowedTags = ["b", "i", "em", "strong", "p", "br", "span"];
      const tagName = match.replace(/<\/?([^\s>]+).*/, "$1").toLowerCase();
      return allowedTags.includes(tagName) ? match : "";
    });
};

// Input sanitization for text fields
export const sanitizeInput = (
  input: string,
  maxLength: number = 1000,
): string => {
  if (typeof input !== "string") return "";

  // Remove potentially dangerous characters
  let sanitized = input
    .replace(/[<>]/g, "") // Remove angle brackets
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, "") // Remove event handlers
    .trim();

  // Limit length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
};

// Email validation with security checks
export const validateEmail = (email: string): boolean => {
  if (typeof email !== "string") return false;

  // Basic email regex with security considerations
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) return false;

  // Additional security checks
  if (email.includes("..")) return false;
  if (email.startsWith(".") || email.endsWith(".")) return false;
  if (email.length > 254) return false; // RFC 5321 limit

  return true;
};

// Phone number validation
export const validatePhone = (phone: string): boolean => {
  if (typeof phone !== "string") return false;

  // Remove common formatting characters
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");

  // Check if it contains only digits and optional +
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;

  return phoneRegex.test(cleanPhone);
};

// SQL injection prevention (parameterized queries are primary defense)
export const escapeSqlLike = (input: string): string => {
  if (typeof input !== "string") return "";

  // Escape LIKE wildcards for Prisma queries
  return input.replace(/[%_\\]/g, "\\$&");
};

// File name sanitization
export const sanitizeFileName = (fileName: string): string => {
  if (typeof fileName !== "string") return "";

  // Remove dangerous characters and preserve safe ones
  return fileName
    .replace(/[<>:"/\\|?*]/g, "") // Remove forbidden characters
    .replace(/\.\./g, "") // Remove directory traversal
    .replace(/^\./, "") // Remove leading dot
    .substring(0, 255); // Limit length
};

// URL validation and sanitization
export const validateUrl = (url: string): boolean => {
  if (typeof url !== "string") return false;

  try {
    const parsedUrl = new URL(url);

    // Only allow http and https protocols
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return false;
    }

    // Prevent javascript: and data: URLs
    if (
      url.toLowerCase().includes("javascript:") ||
      url.toLowerCase().includes("data:")
    ) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
};

// Generate secure random token
export const generateSecureToken = (length: number = 32): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  // Use crypto API if available
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const randomArray = new Uint8Array(length);
    crypto.getRandomValues(randomArray);

    for (let i = 0; i < length; i++) {
      result += chars.charAt(randomArray[i] % chars.length);
    }
  } else {
    // Fallback to Math.random (less secure)
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  }

  return result;
};

// Rate limiting key generator
export const generateRateLimitKey = (
  identifier: string,
  action: string,
): string => {
  const timestamp = Math.floor(Date.now() / 60000); // 1-minute buckets
  return `${identifier}:${action}:${timestamp}`;
};

// Security headers for API responses
export const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'",
};

// CSRF token validation (Next.js handles this automatically for server actions)
export const validateCsrfToken = (token: string): boolean => {
  // This is a placeholder - Next.js App Router handles CSRF automatically
  // For additional manual validation, you could implement double-submit cookie pattern
  return typeof token === "string" && token.length > 0;
};

// Password strength validation
export const validatePasswordStrength = (
  password: string,
): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (typeof password !== "string") {
    errors.push("Password must be a string");
    return { isValid: false, errors };
  }

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  if (password.length > 128) {
    errors.push("Password must be less than 128 characters long");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }

  // Check for common weak passwords
  const commonPasswords = ["password", "123456", "qwerty", "admin", "letmein"];
  if (commonPasswords.some((weak) => password.toLowerCase().includes(weak))) {
    errors.push("Password cannot contain common weak passwords");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Input validation for different field types
export const validateField = (
  fieldName: string,
  value: string,
): {
  isValid: boolean;
  error?: string;
} => {
  if (typeof value !== "string") {
    return { isValid: false, error: `${fieldName} must be a string` };
  }

  switch (fieldName.toLowerCase()) {
    case "email":
      return {
        isValid: validateEmail(value),
        error: validateEmail(value) ? undefined : "Invalid email format",
      };

    case "phone":
      return {
        isValid: validatePhone(value),
        error: validatePhone(value) ? undefined : "Invalid phone number format",
      };

    case "name":
    case "productname":
      if (value.trim().length < 1) {
        return { isValid: false, error: `${fieldName} cannot be empty` };
      }
      if (value.length > 100) {
        return {
          isValid: false,
          error: `${fieldName} cannot exceed 100 characters`,
        };
      }
      return { isValid: true };

    case "description":
      if (value.length > 2000) {
        return {
          isValid: false,
          error: "Description cannot exceed 2000 characters",
        };
      }
      return { isValid: true };

    case "price":
      const price = parseFloat(value);
      if (isNaN(price) || price <= 0) {
        return { isValid: false, error: "Price must be a positive number" };
      }
      if (price > 99999.99) {
        return { isValid: false, error: "Price cannot exceed $99,999.99" };
      }
      return { isValid: true };

    default:
      // Generic validation
      if (value.length > 1000) {
        return {
          isValid: false,
          error: `${fieldName} cannot exceed 1000 characters`,
        };
      }
      return { isValid: true };
  }
};
