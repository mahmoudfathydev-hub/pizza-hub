import { getCurrentLocale } from "@/src/lib/getCurrentLocale";
import MenuItem from "./MenuItem";
import { ProductWithRelation } from "@/src/types/product";
import getTrans from "@/src/lib/translation";
import { getBestSellers } from "@/src/server/db/products";
async function Menu({ items }: { items: ProductWithRelation[] }) {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale, "home");
  const bestSeller = await getBestSellers(3);
  return items.length > 0 ? (
    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  ) : (
    <p>{translations.bestSellers.noProductsFound}</p>
  );
}

export default Menu;
