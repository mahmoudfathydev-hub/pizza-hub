import EditUserForm from "@/components/edit-user-form";
import { Pages, Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import { getUser, getUsers } from "@/server/db/users";
import { redirect } from "next/navigation";

// Remove generateStaticParams to make this page dynamic
// This will be server-rendered on demand instead of statically generated

async function EditUserPage({
  params,
}: {
  params: Promise<{ userId: string; locale: Locale }>;
}) {
  const { locale, userId } = await params;
  const user = await getUser(userId);
  if (!user) {
    redirect(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`);
  }
  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <EditUserForm user={user} />
        </div>
      </section>
    </main>
  );
}

export default EditUserPage;
