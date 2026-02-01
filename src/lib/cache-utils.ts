// Cache utilities for efficient batch operations and invalidation

import { revalidatePath, revalidateTag } from "next/cache";

// Cache tags used throughout the application
export const CACHE_TAGS = {
  PRODUCTS: "products",
  PRODUCTS_BY_CATEGORY: "products-by-category",
  BEST_SELLERS: "best-sellers",
  CATEGORIES: "categories",
  USERS: "users",
  USER: "user",
} as const;

// Common paths that need invalidation
export const CACHE_PATHS = {
  MENU: "/menu",
  ADMIN_MENU_ITEMS: "/admin/menu-items",
  ADMIN_CATEGORIES: "/admin/categories",
  ADMIN_USERS: "/admin/users",
  PROFILE: "/profile",
  HOME: "/",
} as const;

// Batch cache invalidation utility
export const batchRevalidate = async (
  options: {
    tags?: string[];
    paths?: string[];
    locale?: string;
  } = {},
) => {
  const { tags = [], paths = [], locale = "" } = options;

  try {
    // Revalidate all specified tags
    for (const tag of tags) {
      try {
        revalidateTag(tag, "max");
      } catch (tagError) {
        console.warn(`Failed to revalidate tag: ${tag}`, tagError);
      }
    }

    // Revalidate all specified paths
    for (const path of paths) {
      try {
        const fullPath = locale ? `/${locale}${path}` : path;
        revalidatePath(fullPath);
      } catch (pathError) {
        console.warn(`Failed to revalidate path: ${path}`, pathError);
      }
    }
  } catch (error) {
    console.error("Batch revalidation failed:", error);
    throw error;
  }
};

// Product-related cache invalidation
export const revalidateProductCaches = async (locale: string) => {
  await batchRevalidate({
    tags: [
      CACHE_TAGS.PRODUCTS,
      CACHE_TAGS.PRODUCTS_BY_CATEGORY,
      CACHE_TAGS.BEST_SELLERS,
    ],
    paths: [CACHE_PATHS.MENU, CACHE_PATHS.ADMIN_MENU_ITEMS, CACHE_PATHS.HOME],
    locale,
  });
};

// Category-related cache invalidation
export const revalidateCategoryCaches = async (locale: string) => {
  await batchRevalidate({
    tags: [CACHE_TAGS.CATEGORIES, CACHE_TAGS.PRODUCTS_BY_CATEGORY],
    paths: [CACHE_PATHS.MENU, CACHE_PATHS.ADMIN_CATEGORIES, CACHE_PATHS.HOME],
    locale,
  });
};

// User-related cache invalidation
export const revalidateUserCaches = async (locale: string, userId?: string) => {
  const tags: string[] = [CACHE_TAGS.USERS];
  const paths = [CACHE_PATHS.ADMIN_USERS, CACHE_PATHS.PROFILE];

  if (userId) {
    // Invalidate specific user cache
    tags.push(`${CACHE_TAGS.USER}-${userId}`);
  }

  await batchRevalidate({
    tags,
    paths,
    locale,
  });
};

// Selective cache invalidation for performance
export const selectiveRevalidate = async (
  operation: "create" | "update" | "delete",
  entityType: "product" | "category" | "user",
  locale: string,
  entityId?: string,
) => {
  switch (entityType) {
    case "product":
      await revalidateProductCaches(locale);
      break;
    case "category":
      await revalidateCategoryCaches(locale);
      break;
    case "user":
      await revalidateUserCaches(locale, entityId);
      break;
    default:
      console.warn(`Unknown entity type: ${entityType}`);
  }
};

// Cache warming utility (optional - for critical paths)
export const warmCache = async (cacheWarmers: (() => Promise<void>)[]) => {
  try {
    await Promise.allSettled(cacheWarmers);
  } catch (error) {
    console.error("Cache warming failed:", error);
  }
};
