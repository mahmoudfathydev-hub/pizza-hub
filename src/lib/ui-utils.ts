// UI utilities for accessibility, UX improvements, and responsive design

// Accessibility utilities
export const generateAriaLabel = (action: string, objectName?: string): string => {
  const baseLabel = action.charAt(0).toUpperCase() + action.slice(1);
  return objectName ? `${baseLabel} ${objectName}` : baseLabel;
};

export const generateUniqueId = (prefix: string = 'id'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

// Form utilities
export const getFormFieldError = (errors: Record<string, string[]>, fieldName: string): string | undefined => {
  return errors[fieldName]?.[0];
};

export const hasFormFieldError = (errors: Record<string, string[]>, fieldName: string): boolean => {
  return !!errors[fieldName]?.length;
};

// Loading states
export const createLoadingState = (isLoading: boolean, loadingText?: string) => ({
  isLoading,
  loadingText: loadingText || 'Loading...',
  disabled: isLoading,
});

// Image utilities
export const getOptimizedImageUrl = (url: string, options?: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
}): string => {
  if (!url) return '';
  
  const params = new URLSearchParams();
  if (options?.width) params.set('w', options.width.toString());
  if (options?.height) params.set('h', options.height.toString());
  if (options?.quality) params.set('q', options.quality.toString());
  if (options?.format) params.set('f', options.format);
  
  const paramString = params.toString();
  return paramString ? `${url}?${paramString}` : url;
};

// Responsive utilities
export const getResponsiveValue = <T>(values: {
  mobile?: T;
  tablet?: T;
  desktop?: T;
}, breakpoint: 'mobile' | 'tablet' | 'desktop' = 'desktop'): T | undefined => {
  return values[breakpoint];
};

// Animation utilities
export const getAnimationDelay = (index: number, baseDelay: number = 100): number => {
  return index * baseDelay;
};

export const getTransitionDuration = (duration: 'fast' | 'normal' | 'slow' = 'normal'): string => {
  const durations = {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  };
  return durations[duration];
};

// Color utilities
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
};

export const getContrastRatio = (color1: string, color2: string): number => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 0;
  
  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
};

// Keyboard navigation
export const handleKeyboardNavigation = (
  event: React.KeyboardEvent,
  actions: {
    onEnter?: () => void;
    onEscape?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
    onTab?: () => void;
  }
) => {
  switch (event.key) {
    case 'Enter':
      event.preventDefault();
      actions.onEnter?.();
      break;
    case 'Escape':
      event.preventDefault();
      actions.onEscape?.();
      break;
    case 'ArrowUp':
      event.preventDefault();
      actions.onArrowUp?.();
      break;
    case 'ArrowDown':
      event.preventDefault();
      actions.onArrowDown?.();
      break;
    case 'ArrowLeft':
      event.preventDefault();
      actions.onArrowLeft?.();
      break;
    case 'ArrowRight':
      event.preventDefault();
      actions.onArrowRight?.();
      break;
    case 'Tab':
      actions.onTab?.();
      break;
  }
};

// Focus management
export const trapFocus = (container: HTMLElement) => {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ) as NodeListOf<HTMLElement>;
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  };
  
  container.addEventListener('keydown', handleTabKey);
  
  return () => {
    container.removeEventListener('keydown', handleTabKey);
  };
};

// Error boundary utilities
export const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  return 'An unexpected error occurred';
};

export const isErrorRetryable = (error: unknown): boolean => {
  if (error instanceof Error) {
    // Network errors, timeouts, and server errors are typically retryable
    return error.message.includes('fetch') ||
           error.message.includes('timeout') ||
           error.message.includes('network') ||
           error.message.includes('5');
  }
  return false;
};

// Performance utilities
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Local storage utilities with error handling
export const safeLocalStorage = {
  get: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined') {
        return localStorage.getItem(key);
      }
    } catch (error) {
      console.warn('LocalStorage get error:', error);
    }
    return null;
  },
  
  set: (key: string, value: string): boolean => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
        return true;
      }
    } catch (error) {
      console.warn('LocalStorage set error:', error);
    }
    return false;
  },
  
  remove: (key: string): boolean => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
        return true;
      }
    } catch (error) {
      console.warn('LocalStorage remove error:', error);
    }
    return false;
  },
  
  clear: (): boolean => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.clear();
        return true;
      }
    } catch (error) {
      console.warn('LocalStorage clear error:', error);
    }
    return false;
  },
};

// Form validation utilities
export const validateRequired = (value: string | undefined): boolean => {
  return typeof value === 'string' && value.trim().length > 0;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

export const validatePrice = (price: string): boolean => {
  const numPrice = parseFloat(price);
  return !isNaN(numPrice) && numPrice > 0 && numPrice <= 99999.99;
};

// Date utilities
export const formatDate = (date: Date | string, locale: string = 'en-US'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
};

export const formatCurrency = (amount: number, currency: string = 'USD', locale: string = 'en-US'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

// Screen reader utilities
export const announceToScreenReader = (message: string): void => {
  if (typeof window !== 'undefined') {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
};

// Responsive image utilities
export const getSrcSet = (baseUrl: string, sizes: number[]): string => {
  return sizes
    .map(size => `${baseUrl}?w=${size} ${size}w`)
    .join(', ');
};

export const getSizes = (sizes: number[]): string => {
  return sizes
    .map(size => `(max-width: ${size}px) ${size}px`)
    .join(', ');
};

// Theme utilities
export const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

export const applyTheme = (theme: 'light' | 'dark'): void => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }
};
