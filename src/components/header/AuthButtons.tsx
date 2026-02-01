"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { Translations } from "@/types/Translations";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Pages, Routes } from "@/constants/enums";
import { useClientSession } from "@/hooks/useClientSession";
import { Session } from "next-auth";

function AuthButtons({
    initialSession,
    translations,
}: {
    initialSession: Session | null; // <-- النوع الصحيح
    translations: Translations;
}) {
    const { data: session, status } = useClientSession(initialSession);
    const router = useRouter();
    const pathname = usePathname();
    const { locale } = useParams();
    if (status === "loading") return null;

    const isLoggedIn = !!session?.user;

    return (
        <div>
            {isLoggedIn ? (
                <div className="flex items-center gap-4">
                    <Button
                        className="px-8! rounded-full!"
                        size="lg"
                        onClick={() => signOut()}
                    >
                        {translations.navbar.logout}
                    </Button>
                </div>
            ) : (
                <div className="flex items-center gap-6">
                    <Button
                        className="px-8! rounded-full!"
                        size="lg"
                        onClick={() =>
                            router.push(`/${locale}/${Routes.AUTH}/${Pages.Register}`)
                        }
                    >
                        {translations.navbar.register}
                    </Button>
                </div>
            )}
        </div>
    );
}

export default AuthButtons;
