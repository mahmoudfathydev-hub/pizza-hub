import MainHeading from "@/src/components/main-heading"
import { Star } from "lucide-react"
import { getCurrentLocale } from "@/src/lib/getCurrentLocale"
import getTrans from "@/src/lib/translation"

const Testimonials = async () => {
    const locale = await getCurrentLocale()
    const translations = await getTrans(locale, 'home')
    const { testimonials } = translations
    
    return (
        <section className="container mx-auto section-gap">
            <div className="flex flex-col items-center justify-center gap-4 mb-16 text-center">
                <div
                    data-aos="fade-down"
                    data-aos-delay="200"
                    className="text-center mb-4">
                    <MainHeading title={testimonials.heading.title} subTitle={testimonials.heading.subtitle} />
                </div>
                <div
                    data-aos="fade-left"
                    data-aos-delay="200"
                    className="flex flex-col items-center gap-2">
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className="w-5 h-5 fill-primary text-primary"
                            />
                        ))}
                    </div>
                    <p className="text-sm font-semibold text-muted-foreground">
                        {testimonials.ratingSummary}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.items.map((testimonial: any, index: number) => (
                    <div
                        key={index}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                        className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-sm ring-1 ring-border/50 hover:shadow-md transition-shadow"
                    >
                        <blockquote className="text-muted-foreground italic leading-relaxed mb-8">
                            &quot;{testimonial.quote}&quot;
                        </blockquote>
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold">
                                {testimonial.name.split(' ').map((n: any) => n[0]).join('')}
                            </div>
                            <div>
                                <div className="font-bold text-foreground">
                                    {testimonial.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {testimonial.role}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Testimonials
