"use client"

import CartItems from "./_components/CartItems"
import CheckoutForm from "./_components/CheckoutForm"
import { useTranslations } from "@/hooks/use-translations"

const CartPage = () => {
    const { t, loading } = useTranslations('cart')
    
    if (loading) {
        return (
            <main>
                <section className="section-gap">
                    <div className="container">
                        <div className="h-12 bg-gray-200 rounded animate-pulse w-32 mx-auto mb-10"></div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </section>
            </main>
        )
    }
    
    return (
        <main>
            <section className="section-gap">
                <div className="container">
                    <h1 className="text-primary text-center font-bold text-4xl italic mb-10">
                        {t.title || 'Cart'}
                    </h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <CartItems />
                    <CheckoutForm />
                </div>
            </section>
        </main>
    )
}
export default CartPage