import MainHeading from "@/components/main-heading"
import Menu from "@/components/menu"
import { getBestSellers } from "@/server/db/products"
import { getCurrentLocale } from "@/lib/getCurrentLocale"
import getTrans from "@/lib/translation"

async function BestSellers() {
    const locale = await getCurrentLocale()
    const translations = await getTrans(locale, 'home')
    const bestSeller = await getBestSellers(3)
    return (
        <section className="section-gap">
            <div className="container">
                <div className="text-center mb-4">
                    <MainHeading title={translations.bestSellers.heading.title} subTitle={translations.bestSellers.heading.subtitle} />
                </div>
                <Menu items={bestSeller} />
            </div>
        </section>
    )
}

export default BestSellers