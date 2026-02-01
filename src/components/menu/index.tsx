import { getCurrentLocale } from "@/lib/getCurrentLocale";
import MenuItem from "./MenuItem";
import { CategorySkeleton, MenuItemSkeleton } from "@/components/ui/skeleton";
import { ProductWithRelation } from "@/types/product";
import getTrans from "@/lib/translation";
import { Suspense } from "react";

async function Menu({ items }: { items: ProductWithRelation[] }) {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale, "home");

  return (
    <Suspense
      fallback={
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Array.from({ length: 6 }, (_, i) => (
            <MenuItemSkeleton key={i} />
          ))}
        </ul>
      }
    >
      {items.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {items.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center py-8 fade-in">
          {translations.bestSellers.noProductsFound}
        </p>
      )}
    </Suspense>
  );
}

export default Menu;
