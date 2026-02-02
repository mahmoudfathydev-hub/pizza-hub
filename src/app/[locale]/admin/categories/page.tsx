import { Locale } from "@/i18n.config";
import { getCategories } from "@/server/db/categories";
import getTrans from "@/lib/translation";
import { Category } from "@prisma/client";
import Form from "./_components/Form";
import CategoryItem from "./_components/CategoryItem";

async function CategoriesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const Categories = await getCategories();
  const t = await getTrans(locale, "categories");
  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <div className="sm:max-w-156.25 mx-auto space-y-6">
            <Form translations={t} />
            {Categories.length > 0 ? (
              <ul>
                {Categories.map((category: Category) => (
                  <CategoryItem key={category.id} category={category} translations={t} />
                ))}
              </ul>
            ) : (
              <p className="text-accent text-center py-10">
                {t.noCategoriesFound}
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
export default CategoriesPage;
