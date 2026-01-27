"use client"

import Link from "../link"
import Navbar from "./Navbar"
import CartButton from "./CartButton"
import { useTranslations } from "@/src/hooks/use-translations"
import LanguageSwitcher from "./LanguageSwitcher"
import { useParams } from "next/navigation"

const Header = () => {
    const { t } = useTranslations('navbar')
    const params = useParams()
    const locale = (params.locale as string) || 'en'
    
    return (
        <header className="py-4 md:py-6">
            <div className="container flex justify-between items-center">
                <Link href={`/${locale}`} className="text-primary font-semibold text-2xl">
                    {t.header.logo}
                </Link>
                <Navbar />
                <LanguageSwitcher />
                <CartButton />
            </div>
        </header>
    )
}
export default Header