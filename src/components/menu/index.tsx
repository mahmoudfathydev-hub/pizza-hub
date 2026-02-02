import MenuItem from "./MenuItem";
import { MenuItemSkeleton } from "@/components/ui/skeleton";
import { ProductWithRelation } from "@/types/product";
import { Suspense } from "react";

import { HomeTranslations } from "@/lib/translation";

interface MenuProps {
  items: ProductWithRelation[];
  translations: HomeTranslations;
}

function Menu({ items, translations }: MenuProps) {
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
