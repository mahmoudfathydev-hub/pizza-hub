import Menu from "@/src/components/menu";
import { getProductsByCategory } from "@/src/server/db/products";
import { getCurrentLocale } from "@/src/lib/getCurrentLocale";
import getTrans from "@/src/lib/translation";

async function MenuPage() {
  const locale = await getCurrentLocale();
  const t = await getTrans(locale, "categories");
  const categorites = await getProductsByCategory();

  // Helper function to get translated category name
  const getCategoryDisplayName = (categoryKey: string) => {
    return t.categoryName[categoryKey] || categoryKey;
  };

  return (
    <main>
      {categorites.map((category) => (
        <section key={category.id}>
          <div className="container">
            <h1 className="text-primary font-bold text-4xl italic mb-6">
              {getCategoryDisplayName(category.name)}
            </h1>
            <Menu items={category.products} />
          </div>
        </section>
      ))}
    </main>
  );
}

export default MenuPage;
