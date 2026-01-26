import MainHeading from "@/src/components/main-heading"
import Menu from "@/src/components/menu"
import { getBestSellers } from "@/src/server/db/products";
async function BestSellers() {
    const bestSeller = await getBestSellers(3)
    return (
        <section className="section-gap">
            <div className="container">
                <div className="text-center mb-4">
                    <MainHeading title={"Our Best Sellers"} subTitle={"Check out"} />
                </div>
                <Menu items={bestSeller} />
            </div>
        </section>
    )
}

export default BestSellers