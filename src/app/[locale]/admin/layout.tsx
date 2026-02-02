import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import AdminTabs from "./_components/AdminTabs";
import { Suspense } from "react";

async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = await getTrans(locale as Locale, "admin");
  return (
    <>
      <Suspense fallback={null}>
        <AdminTabs translations={translations} />
      </Suspense>
      {children}
    </>
  );
}

export default AdminLayout;
