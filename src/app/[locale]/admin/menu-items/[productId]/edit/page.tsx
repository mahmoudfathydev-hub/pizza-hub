import { Pages, Routes } from "@/src/constants/enums";
import { Locale } from "@/src/i18n.config";
import { getProduct, getProducts } from "@/src/server/db/products";
import { redirect } from "next/navigation";
import Form from "../../_components/Form";
import { getCategories } from "@/src/server/db/categories";
import getTrans from "@/src/lib/translation";

export async function generateStaticParams() {
    const products = await getProducts();

    return products.map((product) => ({ productId: product.id }));
}
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
