import MainHeading from "@/components/main-heading"
import Menu from "@/components/menu"
import { getBestSellers } from "@/server/db/products"
import { Locale } from "@/i18n.config"
import getTrans from "@/lib/translation"

interface BestSellersProps {
    locale: Locale;
}

async function BestSellers({ locale }: BestSellersProps) {
    const translations = await getTrans(locale, 'home')
    const bestSeller = await getBestSellers(3)
    return (
        <section className="section-gap">
            <div className="container">
                <div className="text-center mb-4">
                    <MainHeading title={translations.bestSellers.heading.title} subTitle={translations.bestSellers.heading.subtitle} />
                </div>
                <Menu items={bestSeller} translations={translations} />
            </div>
        </section>
    )
}

export default BestSellers