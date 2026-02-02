import { Pages, Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import { getProduct } from "@/server/db/products";
import { redirect } from "next/navigation";
import Form from "../../_components/Form";
import { getCategories } from "@/server/db/categories";
import getTrans from "@/lib/translation";

// Opt out of prerendering for dynamic product pages
export const dynamic = "force-dynamic";

async function EditProductPage({
  params,
}: {
  params: Promise<{ locale: Locale; productId: string }>;
}) {
  const { productId, locale } = await params;
  const translations = await getTrans(locale, "menuItems");
  const product = await getProduct(productId);
  const categories = await getCategories();

  if (!product) {
    redirect(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`);
  }

  return (
    <main>
      <section>
        <div className="container">
          <Form
            categories={categories}
            translations={translations}
            product={product}
          />
        </div>
      </section>
    </main>
  );
}

export default EditProductPage;
