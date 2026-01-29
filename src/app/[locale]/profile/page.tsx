import { Pages, Routes } from "@/src/constants/enums";
import { Locale } from "@/src/i18n.config";
import { authOptions } from "@/src/server/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import getTrans from "@/src/lib/translation";

async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const session = await getServerSession(authOptions);
  const { locale } = await params;
  if (!session) {
    redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
  }

  const translations = await getTrans(locale, "navbar");

  return (
    <main className="py-44 md:py-40 bg-gray-50 element-center">
      <div className="container element-center">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center text-black mb-4">
            {translations.profile.title}
          </h2>
          <div className="text-center text-accent">
            <p>Profile page coming soon...</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;
