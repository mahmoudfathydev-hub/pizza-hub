import EditUserForm from "@/src/components/edit-user-form";
import { Pages, Routes } from "@/src/constants/enums";
import { Locale } from "@/src/i18n.config";
import { getUser, getUsers } from "@/src/server/db/users";
import { redirect } from "next/navigation";

export async function generateStaticParams() {
  const users = await getUsers();

  return users.map((user) => ({ userId: user.id }));
}

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
