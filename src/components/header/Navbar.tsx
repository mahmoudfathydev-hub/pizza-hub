"use client";
import { Routes } from "@/constants/enums";
import Link from "../link";
import { Button } from "../ui/button";
import { useState, useEffect, useCallback } from "react";
import { Menu, XIcon } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { Translations } from "@/types/Translations";
import { UserRole } from "@prisma/client";
import AuthButtons from "./AuthButtons";
import { useClientSession } from "@/hooks/useClientSession";
import { Session } from "next-auth";

function Navbar({
  translations,
  initialSession,
}: {
  translations: Translations;
  initialSession: Session | null;
}) {
  const session = useClientSession(initialSession);

  const [openMenu, setOpenMenu] = useState(false);
  const { locale } = useParams();
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setOpenMenu(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [openMenu]);

  const closeMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  const links = [
    {
      id: crypto.randomUUID(),
      title: translations.navbar.menu,
      href: Routes.MENU,
    },
    {
      id: crypto.randomUUID(),
      title: translations.navbar.about,
      href: Routes.ABOUT,
    },
    {
      id: crypto.randomUUID(),
      title: translations.navbar.contact,
      href: Routes.CONTACT,
    },
  ];
  const isAdmin = session.data?.user?.role === UserRole.ADMIN;

  return (
    <nav className="order-last lg:order-0">
      {/* Hamburger Menu Button */}
      <Button
        variant="secondary"
        size="sm"
        className="lg:hidden"
        onClick={() => setOpenMenu(true)}
        aria-label="Open navigation menu"
        aria-expanded={openMenu}
        aria-controls="mobile-nav-menu"
      >
        <Menu className="w-6! h-6!" />
      </Button>

      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[55] lg:hidden transition-opacity duration-300 ${openMenu ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Navigation Menu */}
      <ul
        id="mobile-nav-menu"
        role="menu"
        className={`fixed lg:static top-0 px-10 py-20 lg:p-0 bg-background lg:bg-transparent h-full lg:h-auto flex-col lg:flex-row w-[280px] lg:w-auto flex items-start lg:items-center gap-10 z-[60] lg:z-auto shadow-2xl lg:shadow-none transition-transform duration-300 ease-in-out ${openMenu
            ? "translate-x-0"
            : "-translate-x-full rtl:translate-x-full lg:translate-x-0"
          } left-0 rtl:left-auto rtl:right-0`}
      >
        {/* Close Button */}
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-6 right-6 rtl:right-auto rtl:left-6 lg:hidden"
          onClick={closeMenu}
          aria-label="Close navigation menu"
        >
          <XIcon className="w-6! h-6!" />
        </Button>

        {/* Navigation Links */}
        {links.map((link) => (
          <li key={link.id} role="menuitem">
            <Link
              onClick={closeMenu}
              href={`/${locale}/${link.href}`}
              className={`hover:text-primary duration-200 transition-colors font-semibold ${pathname.startsWith(`/${locale}/${link.href}`)
                  ? "text-primary"
                  : "text-accent"
                }`}
            >
              {link.title}
            </Link>
          </li>
        ))}

        {/* Profile/Admin Link */}
        {session.data?.user && (
          <li role="menuitem">
            <Link
              href={
                isAdmin
                  ? `/${locale}/${Routes.ADMIN}`
                  : `/${locale}/${Routes.PROFILE}`
              }
              onClick={closeMenu}
              className={`${pathname.startsWith(
                isAdmin
                  ? `/${locale}/${Routes.ADMIN}`
                  : `/${locale}/${Routes.PROFILE}`
              )
                  ? "text-primary"
                  : "text-accent"
                } hover:text-primary duration-200 transition-colors font-semibold`}
            >
              {isAdmin ? translations.navbar.admin : translations.navbar.user}
            </Link>
          </li>
        )}

        {/* Mobile-only: Auth Buttons & Language Switcher */}
        <li className="lg:hidden flex flex-col gap-4 mt-auto" role="menuitem">
          <div onClick={closeMenu}>
            <AuthButtons initialSession={null} translations={translations} />
          </div>
          <LanguageSwitcher />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
