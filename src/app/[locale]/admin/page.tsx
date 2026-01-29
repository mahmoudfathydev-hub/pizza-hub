import EditUserForm from "@/src/components/edit-user-form";
import { Pages, Routes } from "@/src/constants/enums";
import { Locale } from "@/src/i18n.config";
import { authOptions } from "@/src/server/auth";
import { UserRole } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
                    <EditUserForm user={session?.user}/>
                </div>
            </section>
        </main>
    );
}

export default AdminPage;