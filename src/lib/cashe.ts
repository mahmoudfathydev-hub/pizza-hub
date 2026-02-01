import { cache as reactCache } from "react";
import { unstable_cache as nextCache, cacheTag } from "next/cache";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback = (...args: any[]) => Promise<any>;

export function cache<T extends Callback>(
  cb: T,
  keyParts: string[],
  options: { revalidate?: number | false; tags?: string[] },
) {
  // Create the cached function with proper tag support
  const cachedFunction = nextCache(reactCache(cb), keyParts, options);

  // If tags are specified, add cacheTag calls for proper invalidation
  const tags = options.tags ?? [];
  if (tags.length > 0) {
    return async (...args: Parameters<T>) => {
      // Add cache tags for Next.js 16 compatibility
      for (const tag of tags) {
        cacheTag(tag);
      }
      return cachedFunction(...args);
    };
  }

  return cachedFunction;
}
