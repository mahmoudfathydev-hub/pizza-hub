import { Routes } from "@/src/constants/enums"
import Link from "../link"
import Navbar from "./Navbar"
import CartButton from "./CartButton"

const Header = () => {
    return (
        <header className="py-4 md:py-6">
            <div className="container flex justify-between items-center">
                <Link href={Routes.ROOT} className="text-primary font-semibold text-2xl">
                    🍕 Pizza Hub
                </Link>
                <Navbar />
                <CartButton />
            </div>
        </header>
    )
}

export default Header