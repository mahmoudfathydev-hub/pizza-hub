import { Locale } from "@/src/i18n.config";
import getTrans from "@/src/lib/translation";
import AdminTabs from "./_components/AdminTabs";

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
      <AdminTabs translations={translations} />
      {children}
    </>
  );
}

export default AdminLayout;
