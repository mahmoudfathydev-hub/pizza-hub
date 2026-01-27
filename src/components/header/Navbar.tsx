"use client"
import { Pages, Routes } from "@/src/constants/enums"
import Link from "../link"
import { Button, buttonVariants } from "../ui/button"
import { useState } from "react"
import { Menu, XIcon } from "lucide-react"
import { useTranslations } from "@/src/hooks/use-translations"
import { useParams, usePathname } from "next/navigation"

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false)
    const { t } = useTranslations('navbar')
    const {locale} = useParams()
    const pathname = usePathname()
    const linkes = [
        { id: crypto.randomUUID(), href: Routes.MENU, title: t.navbar.menu },
        { id: crypto.randomUUID(), href: Routes.ABOUT, title: t.navbar.about },
        { id: crypto.randomUUID(), href: Routes.CONTACT, title: t.navbar.contact },
        { id: crypto.randomUUID(), href: `${Routes.AUTH}/${Pages.LOGIN}`, title: t.navbar.login },
    ]
    return (
        <nav className="flex-1 justify-end flex">
            <Button 
            variant="secondary"
            size="sm"
            className="lg:hidden cursor-pointer"
            onClick={() => setOpenMenu(true)}>
                <Menu className="w-6! h-6!" />
            </Button>
            <ul className={`fixed lg:static ${openMenu ? "left-0 z-50" : "-left-full"
                } top-0 px-10 py-20 lg:p-0 bg-background lg:bg-transparent transition-all duration-200 h-full lg:h-auto flex-col lg:flex-row w-full lg:w-auto flex items-start lg:items-center gap-10`}>
                <Button 
                variant="secondary"
                size="sm"
                className="absolute top-5 right-15 lg:hidden cursor-pointer"
                onClick={() => setOpenMenu(false)}>
                    <XIcon className="w-6! h-6!" />
                </Button>
                {linkes.map(link => (
                    <li key={link.id}>
                        <Link
                            href={`/${locale}/${link.href}`}
                            className={`${link.href === `${Routes.AUTH}/${Pages.LOGIN}` ?
                                `${buttonVariants({size: "lg"})} px-8! rounded-full!` :
                                "text-accent hover:text-primary transition-colors duration-200 "} 
                                font-semibold ${pathname.startsWith(`/${locale}/${link.href}`) ? "text-primary" : "text-accent"}`}>
                            {link.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default Navbar