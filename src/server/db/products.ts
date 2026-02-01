// src/server/db/products.ts
import { cache } from "@/lib/cashe";
import { db } from "@/lib/prisma";

// ----------------------------
// Products by Category - Optimized to prevent N+1 queries
// ----------------------------
export const getProductsByCategory = cache(
  async () => {
    // Single optimized query with proper includes to prevent N+1 problems
    return await db.category.findMany({
      include: {
        products: {
          include: {
            sizes: {
              orderBy: { price: "asc" }, // Order sizes by price for consistency
            },
            extras: {
              orderBy: { name: "asc" }, // Order extras by name for consistency
            },
          },
          orderBy: { order: "asc" },
        },
      },
      orderBy: { order: "asc" },
    });
  },
  ["products-by-category"],
  { revalidate: 3600, tags: ["products", "products-by-category"] },
);

// ----------------------------
// Best Sellers
// ----------------------------
export const getBestSellers = cache(
  async (limit?: number) => {
    const targetLimit = limit || 3;

    // Single optimized query for best sellers with fallback to newest products
    const bestSellers = await db.product.findMany({
      where: {
        OR: [
          { orders: { some: {} } }, // Products with orders
          { orders: { none: {} } }, // Products without orders (for fallback)
        ],
      },
      orderBy: [
        { orders: { _count: "desc" } }, // Primary: order by order count
        { createdAt: "desc" }, // Secondary: newest first
      ],
      include: { sizes: true, extras: true },
      take: targetLimit,
    });

    return bestSellers;
  },
  ["best-sellers"],
  { revalidate: 3600, tags: ["products", "best-sellers"] },
);

// ----------------------------
// All Products - Optimized with proper ordering
// ----------------------------
export const getProducts = cache(
  async () => {
    return await db.product.findMany({
      orderBy: { order: "asc" },
      include: {
        sizes: {
          orderBy: { price: "asc" },
        },
        extras: {
          orderBy: { name: "asc" },
        },
      },
    });
  },
  ["products"],
  { revalidate: 3600, tags: ["products"] },
);

// ----------------------------
// Single Product - Optimized with proper ordering
// ----------------------------
export const getProduct = cache(
  async (id: string) => {
    return await db.product.findUnique({
      where: { id },
      include: {
        sizes: {
          orderBy: { price: "asc" },
        },
        extras: {
          orderBy: { name: "asc" },
        },
      },
    });
  },
  ["product"],
  { revalidate: 3600, tags: ["products"] },
);
