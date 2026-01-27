import Link from "@/src/components/link"
import { buttonVariants } from "@/src/components/ui/button"
import { Routes } from "@/src/constants/enums"
import { getCurrentLocale } from "@/src/lib/getCurrentLocale"
import getTrans from "@/src/lib/translation"
import { ArrowRightCircle } from "lucide-react"
import Image from "next/image"

async function Hero() {
    const locale = await getCurrentLocale()
    const translations = await getTrans(locale, 'home')
    
    return (
        <section className="section-gap">
            <div className="container grid grid-cols-1 md:grid-cols-2">
                <div className="text md:py-12 ">
                    <h1 className="text-4xl font-semibold">{translations.hero.title}</h1>
                    <p className="text-accent my-4">{translations.hero.description}</p>
                    <div className="btns flex items-center gap-4">
                        <Link
                            href={`/${Routes.MENU}`}
                            className={`${buttonVariants({ size: "lg" })} 
                        space-x-2 px-4! rounded-full! uppercase`}>
                            {translations.hero.primaryCta}
                            <ArrowRightCircle className={`w-5! h-5!`} />
                        </Link>
                        <Link
                            href={`/${Routes.ABOUT}`}
                            className="flex gap-2 items-center text-black hover:text-primary duration-300 transition-all font-semibold">
                            {translations.hero.secondaryCta}
                            <ArrowRightCircle className={`w-5! h-5!`} />
                        </Link>
                    </div>
                </div>
                <div className="img relative hidden md:block">
                    <Image src="/pizza.png" alt={translations.hero.imageAlt} fill loading="eager" priority className="object-contain" />
                </div>
            </div>
        </section>
    )
}

export default Hero