// Optimistic locking utilities to prevent concurrent update conflicts

export interface VersionedEntity {
  version: number;
  updatedAt: Date;
}

export interface OptimisticLockResult<T> {
  success: boolean;
  entity?: T;
  error?: string;
}

// Helper function to check for version conflicts
export const checkVersionConflict = <T extends VersionedEntity>(
  currentEntity: T | null,
  expectedVersion?: number
): OptimisticLockResult<T> => {
  if (!currentEntity) {
    return {
      success: false,
      error: "Entity not found",
    };
  }

  if (expectedVersion !== undefined && currentEntity.version !== expectedVersion) {
    return {
      success: false,
      error: `Version conflict: expected version ${expectedVersion}, but found version ${currentEntity.version}. The entity has been modified by another user.`,
    };
  }

  return {
    success: true,
    entity: currentEntity,
  };
};

// Helper function to increment version on update
export const incrementVersion = (data: any): any => {
  return {
    ...data,
    version: {
      increment: 1,
    },
    updatedAt: new Date(),
  };
};

// Retry configuration for concurrent updates
export interface RetryConfig {
  maxRetries: number;
  baseDelay: number; // in milliseconds
  maxDelay: number; // in milliseconds
}

export const defaultRetryConfig: RetryConfig = {
  maxRetries: 3,
  baseDelay: 100,
  maxDelay: 1000,
};

// Exponential backoff retry helper
export const retryWithBackoff = async <T>(
  operation: () => Promise<T>,
  config: RetryConfig = defaultRetryConfig
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      // Don't retry on certain error types
      if (error instanceof Error && (
        error.message.includes('Version conflict') ||
        error.message.includes('not found') ||
        error.message.includes('validation')
      )) {
        throw lastError;
      }

      // If this is the last attempt, throw the error
      if (attempt === config.maxRetries) {
        throw lastError;
      }

      // Calculate delay with exponential backoff
      const delay = Math.min(
        config.baseDelay * Math.pow(2, attempt),
        config.maxDelay
      );

      // Add jitter to prevent thundering herd
      const jitter = delay * 0.1 * Math.random();
      const totalDelay = delay + jitter;

      await new Promise(resolve => setTimeout(resolve, totalDelay));
    }
  }

  throw lastError!;
};
