// Database utilities for enhanced connection management and transaction handling

import { db } from "@/lib/prisma";
import { Environments } from "@/constants/enums";

// Connection health check
export const checkDatabaseHealth = async (): Promise<{
  healthy: boolean;
  error?: string;
}> => {
  try {
    await db.$queryRaw`SELECT 1`;
    return { healthy: true };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown database error";
    console.error("Database health check failed:", errorMessage);
    return { healthy: false, error: errorMessage };
  }
};

// Enhanced transaction with retry logic and better error handling
export const executeWithTransaction = async <T>(
  operation: (tx: any) => Promise<T>,
  options: {
    maxRetries?: number;
    timeout?: number;
    isolationLevel?:
      | "ReadUncommitted"
      | "ReadCommitted"
      | "RepeatableRead"
      | "Serializable";
  } = {},
): Promise<T> => {
  const {
    maxRetries = 3,
    timeout = 30000,
    isolationLevel = "ReadCommitted",
  } = options;
  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const startTime = Date.now();

    try {
      // Add timeout to the transaction
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("Transaction timeout")), timeout);
      });

      const transactionPromise = db.$transaction(
        async (tx) => {
          return await operation(tx);
        },
        {
          isolationLevel,
        },
      );

      const result = await Promise.race([transactionPromise, timeoutPromise]);

      // Log successful transaction in development
      if (process.env.NODE_ENV === Environments.DEV) {
        console.log(
          `Transaction completed successfully in ${Date.now() - startTime}ms`,
        );
      }

      return result;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Don't retry on certain error types
      if (
        lastError.message.includes("Transaction timeout") ||
        lastError.message.includes("constraint violation") ||
        lastError.message.includes("not found") ||
        attempt === maxRetries
      ) {
        break;
      }

      // Exponential backoff for retries
      const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
      await new Promise((resolve) => setTimeout(resolve, delay));

      console.warn(
        `Transaction attempt ${attempt + 1} failed, retrying in ${delay}ms:`,
        lastError.message,
      );
    }
  }

  const finalError =
    lastError || new Error("Transaction failed with unknown error");
  console.error(
    `Transaction failed after ${maxRetries + 1} attempts:`,
    finalError.message,
  );
  throw finalError;
};

// Connection pool monitoring
export const getConnectionPoolStats = async () => {
  try {
    // This is a simplified version - in production you'd want more detailed monitoring
    const result =
      await db.$queryRaw`SELECT count(*) as active_connections FROM pg_stat_activity WHERE state = 'active'`;
    return result;
  } catch (error) {
    console.error("Failed to get connection pool stats:", error);
    return null;
  }
};

// Graceful shutdown helper
export const gracefulDatabaseShutdown = async (): Promise<void> => {
  try {
    console.log("Starting graceful database shutdown...");

    // Wait for active connections to complete (max 10 seconds)
    const shutdownTimeout = setTimeout(async () => {
      console.warn("Shutdown timeout, forcing disconnection...");
      await db.$disconnect();
    }, 10000);

    await db.$disconnect();
    clearTimeout(shutdownTimeout);

    console.log("Database shutdown completed successfully");
  } catch (error) {
    console.error("Error during database shutdown:", error);
  }
};

// Database migration helper
export const runDatabaseMigration = async (): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    // This would typically run Prisma migrations
    console.log("Checking database schema...");

    // Verify critical tables exist
    const tables = await db.$queryRaw`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    `;

    const requiredTables = [
      "User",
      "Product",
      "Category",
      "Order",
      "Size",
      "Extra",
    ];
    const existingTables = (tables as any[]).map((t) => t.table_name);

    const missingTables = requiredTables.filter(
      (table) => !existingTables.includes(table),
    );

    if (missingTables.length > 0) {
      return {
        success: false,
        error: `Missing required tables: ${missingTables.join(", ")}`,
      };
    }

    // Check if version column exists on Product table
    const versionColumn = await db.$queryRaw`
      SELECT column_name FROM information_schema.columns 
      WHERE table_name = 'Product' AND column_name = 'version'
    `;

    if ((versionColumn as any[]).length === 0) {
      console.warn(
        "Product table missing version column - migration may be needed",
      );
    }

    return { success: true };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown migration error";
    return { success: false, error: errorMessage };
  }
};

// Query performance monitor
export const monitorQueryPerformance = async <T>(
  queryName: string,
  query: () => Promise<T>,
): Promise<T> => {
  const startTime = performance.now();

  try {
    const result = await query();
    const duration = performance.now() - startTime;

    // Log slow queries
    if (duration > 1000) {
      // 1 second threshold
      console.warn(
        `Slow query detected: ${queryName} took ${duration.toFixed(2)}ms`,
      );
    }

    // In development, log all queries
    if (process.env.NODE_ENV === Environments.DEV) {
      console.log(`Query ${queryName}: ${duration.toFixed(2)}ms`);
    }

    return result;
  } catch (error) {
    const duration = performance.now() - startTime;
    console.error(
      `Query ${queryName} failed after ${duration.toFixed(2)}ms:`,
      error,
    );
    throw error;
  }
};
