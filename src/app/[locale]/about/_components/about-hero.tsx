import Image from "next/image"
import { getCurrentLocale } from "@/src/lib/getCurrentLocale"
import getTrans from "@/src/lib/translation"

const AboutHero = async () => {
    const locale = await getCurrentLocale()
    const translations = await getTrans(locale, 'about')
    
    return (
        <section className="container mx-auto section-gap flex flex-col md:flex-row items-center gap-12">
            <div
                data-aos="fade-right"
                className="w-full md:w-1/2 relative h-125 bg-gray-200 rounded-3xl overflow-hidden flex items-center justify-center"
            >
                <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center text-neutral-400 font-bold text-xl">
                    <Image src="/heroabout.png" alt={translations.hero.imageAlt} fill className="object-contain"/>
                </div>
            </div>

            <div
                data-aos="fade-left"
                className="w-full md:w-1/2 flex flex-col gap-6"
            >
                <div className="inline-block bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-bold w-fit">
                    {translations.hero.badge}
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-foreground">
                    {translations.hero.title.split(' ').map((word: string, index: number) => 
                        word === 'Wood-Fired' ? 
                            <><span className="text-primary">{word}</span> </> : 
                            <>{word} </>
                    )}
                </h1>

                <div className="flex flex-col gap-4 text-muted-foreground text-lg leading-relaxed">
                    {translations.hero.description.map((paragraph: string, index: number) => (
                        <p key={index}>
                            {paragraph}
                        </p>
                    ))}
                </div>

                <div className="flex gap-4 mt-4">
                    <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                        <span className="font-bold text-foreground">{translations.hero.stats.count}</span>
                        <span className="text-sm text-neutral-500">{translations.hero.stats.label}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutHero
