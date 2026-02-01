"use client"
import { Routes } from "@/constants/enums"
import Link from "../link"
import { ShoppingCart } from "lucide-react"
import { getCartQuantity } from "@/lib/cart"
import { useAppSelector } from "@/redux/hooks"
import { selectCartItems } from "@/redux/features/cart/cartSlice"

const CartButton = () => {
    const cart = useAppSelector(selectCartItems)
    const cartQuantity = getCartQuantity(cart)
    return (
        <Link href={`/${Routes.CART}`} className="block relative group">
            <span className="absolute text-white flex items-center justify-center -top-5  start-5 w-6 h-6 bg-primary rounded-full">
                {cartQuantity}
            </span>
            <ShoppingCart
                className={`text-accent group-hover:text-primary duration-200 transition-colors`} />
        </Link>
    )
}
export default CartButton