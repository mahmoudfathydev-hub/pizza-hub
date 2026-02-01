import EditUserForm from "@/components/edit-user-form";
import { Pages, Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import { authOptions } from "@/server/auth";
import { UserRole } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// Force dynamic rendering
export const dynamic = "force-dynamic";

async function AdminPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
  }

  if (session && session.user.role !== UserRole.ADMIN) {
    redirect(`/${locale}/${Routes.PROFILE}`);
  }
  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <EditUserForm user={session?.user} />
        </div>
      </section>
    </main>
  );
}

export default AdminPage;
