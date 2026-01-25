"use client"
import { Pages, Routes } from "@/src/constants/enums"
import Link from "../link"
import { Button, buttonVariants } from "../ui/button"
import { useState } from "react"
import { Menu, XIcon } from "lucide-react"

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false)
    const linkes = [
        { id: crypto.randomUUID(), href: Routes.MENU, title: "Menu" },
        { id: crypto.randomUUID(), href: Routes.ABOUT, title: "About" },
        { id: crypto.randomUUID(), href: Routes.CONTACT, title: "Contact" },
        { id: crypto.randomUUID(), href: `${Routes.AUTH}/${Pages.LOGIN}`, title: "Login" },
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
                            href={`/${link.href}`}
                            className={`${link.href === `${Routes.AUTH}/${Pages.LOGIN}` ?
                                `${buttonVariants({size: "lg"})} px-8! rounded-full!` :
                                "text-accent hover:text-primary transition-colors duration-200 "} 
                                font-semibold`}>
                            {link.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navbar