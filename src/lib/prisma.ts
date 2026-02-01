import { Environments } from "@/constants/enums";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
  pool: Pool;
};

// Create connection pool with proper configuration
const pool =
  globalForPrisma.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
    connectionTimeoutMillis: 2000, // How long to wait when connecting a new client
  });

// Create Prisma adapter
const adapter = new PrismaPg(pool);

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === Environments.DEV
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== Environments.PROD) {
  globalForPrisma.prisma = db;
  globalForPrisma.pool = pool;
} else {
  // Production cleanup: Ensure proper connection cleanup
  process.on("beforeExit", async () => {
    try {
      await globalForPrisma.prisma?.$disconnect();
      await globalForPrisma.pool?.end();
    } catch (error) {
      console.error("Error during database cleanup:", error);
    }
  });

  process.on("SIGINT", async () => {
    try {
      await globalForPrisma.prisma?.$disconnect();
      await globalForPrisma.pool?.end();
      process.exit(0);
    } catch (error) {
      console.error("Error during SIGINT cleanup:", error);
      process.exit(1);
    }
  });

  process.on("SIGTERM", async () => {
    try {
      await globalForPrisma.prisma?.$disconnect();
      await globalForPrisma.pool?.end();
      process.exit(0);
    } catch (error) {
      console.error("Error during SIGTERM cleanup:", error);
      process.exit(1);
    }
  });
}
