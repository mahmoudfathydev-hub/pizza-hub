"use client";

import Link from "../link";
import Navbar from "./Navbar";
import CartButton from "./CartButton";
import { useTranslations } from "@/hooks/use-translations";
import LanguageSwitcher from "./LanguageSwitcher";
import { useParams } from "next/navigation";
import AuthButtons from "./AuthButtons";

const Header = () => {
  const { t: navbarTranslations, loading } = useTranslations("navbar");
  const params = useParams();
  const locale = (params.locale as string) || "en";

  if (loading || !navbarTranslations) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 py-4 md:py-6 bg-background/95 backdrop-blur-sm border-b">
        <div className="container flex justify-between items-center gap-6 lg:gap-10">
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex items-center gap-6 flex-1 justify-end">
            <div className="hidden lg:flex lg:items-center lg:gap-6">
              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  // Create a combined translations object for components that expect the full structure
  const combinedTranslations = {
    ...navbarTranslations,
    navbar: {
      ...navbarTranslations?.navbar,
    },
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 md:py-6 bg-background/95 backdrop-blur-sm border-b">
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