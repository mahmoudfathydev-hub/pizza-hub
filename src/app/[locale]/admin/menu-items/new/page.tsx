import { Pages, Routes } from "@/src/constants/enums";
import { getCurrentLocale } from "@/src/lib/getCurrentLocale";
import getTrans from "@/src/lib/translation";
import { authOptions } from "@/src/server/auth";
import { UserRole } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Form from "../_components/Form";
import { getCategories } from "@/src/server/db/categories";

async function NewProductPage() {
  const session = await getServerSession(authOptions);
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale, "menuItems");
  const categories = await getCategories();

  if (!session) {
    redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
  }

  if (session && session.user.role !== UserRole.ADMIN) {
    redirect(`/${locale}/${Routes.PROFILE}`);
  }
  if (!categories || categories.length === 0) {
    redirect(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
  }
  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <Form translations={translations} categories={categories} />
        </div>
      </section>
    </main>
  );
}

export default NewProductPage;
