import MainHeading from "@/src/components/main-heading"
import { Leaf, Users, UtensilsCrossed } from "lucide-react"
import { getCurrentLocale } from "@/src/lib/getCurrentLocale"
import getTrans from "@/src/lib/translation"

const AboutValues = async () => {
    const locale = await getCurrentLocale()
    const translations = await getTrans(locale, 'about')
    
    const values = [
        {
            icon: Leaf,
            title: translations.values.items[0].title,
            description: translations.values.items[0].description,
            color: "bg-orange-100 text-orange-600",
            delay: 0
        },
        {
            icon: Users,
            title: translations.values.items[1].title,
            description: translations.values.items[1].description,
            color: "bg-orange-100 text-orange-600",
            delay: 150
        },
        {
            icon: UtensilsCrossed,
            title: translations.values.items[2].title,
            description: translations.values.items[2].description,
            color: "bg-orange-100 text-orange-600",
            delay: 300
        }
    ]
    
    return (
        <section className="container mx-auto section-gap">
            <div className="text-center mb-16" data-aos="fade-up">
                <div className="flex justify-center items-center mb-12">
                    <div data-aos="fade-right" className="text-center">
                        <MainHeading
                            title={translations.values.heading.title}
                            subTitle={translations.values.heading.subtitle}
                        />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {values.map((value, index) => (
                    <div
                        key={index}
                        data-aos="fade-up"
                        data-aos-delay={value.delay}
                        className="bg-neutral-50 p-8 rounded-3xl flex flex-col items-start gap-4 hover:shadow-lg transition-all"
                    >
                        <div className={`p-4 rounded-2xl ${value.color}`}>
                            <value.icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold">{value.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {value.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}
export default AboutValues
