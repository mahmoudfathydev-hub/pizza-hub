"use client";

import Link from "../link";
import Navbar from "./Navbar";
import CartButton from "./CartButton";
import { useTranslations } from "@/src/hooks/use-translations";
import LanguageSwitcher from "./LanguageSwitcher";
import { useParams } from "next/navigation";
import AuthButtons from "./AuthButtons";

const Header = () => {
  const { translations: navbarTranslations } = useTranslations("navbar");
  const params = useParams();
  const locale = (params.locale as string) || "en";

  // Create a combined translations object for components that expect the full structure
  const combinedTranslations = {
    ...navbarTranslations,
    navbar: {
      ...navbarTranslations?.navbar,
      register: "Register", // Add missing properties
      signOut: "Sign Out",
      profile: "Profile",
      admin: "Admin",
    },
  };

  return (
    <header className="py-4 md:py-6">
      <div className="container flex justify-between items-center gap-6 lg:gap-10">
        <Link
          href={`/${locale}`}
          className="text-primary font-semibold text-2xl"
        >
          {navbarTranslations?.header?.logo || "🍕 Pizza Hub"}
        </Link>
        <Navbar translations={combinedTranslations} initialSession={null} />
        <div className="flex items-center gap-6 flex-1 justify-end">
          <div className="hidden lg:flex lg:items-center lg:gap-6">
            <AuthButtons
              initialSession={null}
              translations={combinedTranslations}
            />
            <LanguageSwitcher />
          </div>
          <CartButton />
        </div>
      </div>
    </header>
  );
};
export default Header;
