import Link from "@/src/components/link";
import { buttonVariants } from "@/src/components/ui/button";
import { Pages, Routes } from "@/src/constants/enums";
import { Locale } from "@/src/i18n.config";
import { getUsers } from "@/src/server/db/users";
import { Edit, Users } from "lucide-react";
import DeleteUserButton from "./_components/DeleteUserButton";

async function UsersPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const users = await getUsers();

  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <div className="flex items-center gap-3 mb-6">
            <Users className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Users Management</h1>
          </div>

          {users.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No users found
              </h3>
              <p className="text-gray-500">
                There are no users in the system yet.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="flex justify-between items-center gap-4 p-4 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="md:flex justify-between flex-1">
                    <h3 className="text-black font-medium text-sm flex-1">
                      {user.name}
                    </h3>
                    <p className="text-accent font-medium text-sm flex-1">
                      {user.email}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Link
                      href={`/${locale}/${Routes.ADMIN}/${Pages.USERS}/${user.id}/${Pages.EDIT}`}
                      className={`${buttonVariants({ variant: "outline" })}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <DeleteUserButton userId={user.id} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}

export default UsersPage;
