import { getCurrentLocale } from "@/lib/getCurrentLocale";
import MenuItem from "./MenuItem";
import { ProductWithRelation } from "@/types/product";
import getTrans from "@/lib/translation";

async function Menu({ items }: { items: ProductWithRelation[] }) {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale, "home");

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
