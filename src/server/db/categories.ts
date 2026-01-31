import { cache } from "@/src/lib/cashe";
import { db } from "@/src/lib/prisma";

export const getCategories = cache(
  () => {
    const categories = db.category.findMany({
      orderBy: {
        order: "asc",
      },
    });
    return categories;
  },
  ["categories"],
  { revalidate: 3600, tags: ["categories"] },
);
