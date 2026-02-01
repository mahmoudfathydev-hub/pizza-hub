import Menu from "@/components/menu";
import { getProductsByCategory } from "@/server/db/products";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { aosAnimations } from "@/utils/aos";
import { Suspense } from "react";
import { Category } from "@prisma/client";
import { CategorySkeleton } from "@/components/ui/skeleton";

async function MenuPage() {
  const locale = await getCurrentLocale();
  const t = await getTrans(locale, "categories");
  const homeT = await getTrans(locale, "home");

  // Wrap the data fetching in a Suspense boundary
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <MenuPageContent locale={locale} t={t} homeT={homeT} />
    </Suspense>
  );
}

async function MenuPageContent({
  locale,
  t,
  homeT,
}: {
  locale: string;
  t: any;
  homeT: any;
}) {
  const categorites = await getProductsByCategory();

  // Helper function to get translated category name
  const getCategoryDisplayName = (categoryKey: string) => {
    return t.categoryName[categoryKey] || categoryKey;
  };

  return (
    <main>
      {categorites.length === 0 ? (
        <div className="container" {...aosAnimations.fadeInUp()}>
          <p className="text-center text-gray-500 text-lg">
            {t.noCategoriesFound || "No categories found"}
          </p>
        </div>
      ) : (
        categorites.map(
          (category: Category & { products: any[] }, index: number) => (
            <section key={category.id} {...aosAnimations.fadeInUp()}>
              <div className="container">
                <h1 className="text-primary font-bold text-4xl italic mb-6 fade-in">
                  {getCategoryDisplayName(category.name)}
                </h1>
                {category.products.length === 0 ? (
                  <p className="text-gray-500 fade-in">
                    {homeT.bestSellers.noProductsFound ||
                      "No products in this category"}
                  </p>
                ) : (
                  <Suspense
                    fallback={
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {Array.from(
                          { length: Math.min(category.products.length, 6) },
                          (_, i) => (
                            <div key={i} className="animate-pulse">
                              <div className="w-48 h-48 bg-gray-200 rounded-lg mb-4 mx-auto"></div>
                              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                              <div className="h-4 bg-gray-200 rounded mb-2"></div>
                              <div className="h-12 bg-gray-200 rounded-full"></div>
                            </div>
                          ),
                        )}
                      </div>
                    }
                  >
                    <Menu items={category.products} />
                  </Suspense>
                )}
              </div>
            </section>
          ),
        )
      )}
    </main>
  );
}

export default MenuPage;
