import Menu from "@/components/menu";
import { getProductsByCategory } from "@/server/db/products";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

async function MenuPage() {
  const locale = await getCurrentLocale();
  const t = await getTrans(locale, "categories");
  const homeT = await getTrans(locale, "home");
  const categorites = await getProductsByCategory();

  // Helper function to get translated category name
  const getCategoryDisplayName = (categoryKey: string) => {
    return t.categoryName[categoryKey] || categoryKey;
  };

  return (
    <main>
      {categorites.length === 0 ? (
        <div className="container">
          <p className="text-center text-gray-500 text-lg">
            {t.noCategoriesFound || "No categories found"}
          </p>
        </div>
      ) : (
        categorites.map((category) => (
          <section key={category.id}>
            <div className="container">
              <h1 className="text-primary font-bold text-4xl italic mb-6">
                {getCategoryDisplayName(category.name)}
              </h1>
              {category.products.length === 0 ? (
                <p className="text-gray-500">
                  {homeT.bestSellers.noProductsFound ||
                    "No products in this category"}
                </p>
              ) : (
                <Menu items={category.products} />
              )}
            </div>
          </section>
        ))
      )}
    </main>
  );
}

export default MenuPage;
