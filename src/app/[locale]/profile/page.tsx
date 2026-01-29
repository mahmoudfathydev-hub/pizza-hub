import EditUserForm from "@/src/components/edit-user-form";
import { Pages, Routes } from "@/src/constants/enums";
import { Locale } from "@/src/i18n.config";
import getTrans from "@/src/lib/translation";
import { authOptions } from "@/src/server/auth";
import { UserRole } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const translations = await getTrans(locale, "profile");
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
  }
  if (session && session.user.role === UserRole.ADMIN) {
    redirect(`/${locale}/${Routes.ADMIN}`);
  }
  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <h1 className="text-primary text-center font-bold text-4xl italic mb-10">
            {translations.title}
          </h1>
          <EditUserForm user={session?.user} />
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;
