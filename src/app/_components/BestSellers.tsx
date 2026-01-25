import MainHeading from "@/src/components/main-heading"
import Menu from "@/src/components/menu"
import { formatCurrency } from "@/src/lib/formatters"
import Image from "next/image"

const BestSellers = () => {
    const bestSeller = [
        { id: crypto.randomUUID(), name: "Pizza", description: "this is a pizza", basePrice: 12, image: "/pizza.png" },
        { id: crypto.randomUUID(), name: "Pizza", description: "this is a pizza", basePrice: 12, image: "/pizza.png" },
        { id: crypto.randomUUID(), name: "Pizza", description: "this is a pizza", basePrice: 12, image: "/pizza.png" }
    ]
    return (
        <section className="section-gap">
            <div className="container">
                <div className="text-center mb-4">
                    <MainHeading title={"Our Best Sellers"} subTitle={"Check out"} />
                </div>
                <Menu items={bestSeller}/>
            </div>
        </section>
    )
}

export default BestSellers