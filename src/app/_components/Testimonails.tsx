import MainHeading from "@/src/components/main-heading"
import { Star } from "lucide-react"

const testimonials = [
    {
        id: 1,
        name: "Mahmoud Fathy",
        role: "Verified Local Guide",
        initials: "MF",
        quote: "The best wood-fired pizza I've had outside of Naples. The crust is perfectly chewy and the truffle oil adds such an amazing depth.",
        delay: 0,
    },
    {
        id: 2,
        name: "Haidy Mahmoud",
        role: "Pizza Connoisseur",
        initials: "HM",
        quote: "Fast delivery and the pizza was still steaming hot! The pepperoni with spicy honey is a total game changer. My new Friday night staple.",
        delay: 100,
    },
    {
        id: 3,
        name: "Marcus Johnson",
        role: "Happy Dad",
        initials: "MJ",
        quote: "The Family Bundle is amazing value. Everything from the garlic knots to the fresh dough quality is top notch. Highly recommended!",
        delay: 200,
    },
]

const Testimonials = () => {
    return (
        <section className="container mx-auto section-gap">
            <div className="flex flex-col items-center justify-center gap-4 mb-16 text-center">
                <div
                    data-aos="fade-down"
                    data-aos-delay="200"
                    className="text-center mb-4">
                    <MainHeading title={"Lovers Say"} subTitle={"What Our Pizza"} />
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
                        4.9/5 Average Rating
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        data-aos="fade-up"
                        data-aos-delay={testimonial.delay}
                        className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-sm ring-1 ring-border/50 hover:shadow-md transition-shadow"
                    >
                        <blockquote className="text-muted-foreground italic leading-relaxed mb-8">
                            &quot;{testimonial.quote}&quot;
                        </blockquote>
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold">
                                {testimonial.initials}
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
