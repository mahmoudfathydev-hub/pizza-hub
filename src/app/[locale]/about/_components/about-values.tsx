import MainHeading from "@/src/components/main-heading"
import { Leaf, Users, UtensilsCrossed } from "lucide-react"
const values = [
    {
        icon: Leaf,
        title: "Authentic Ingredients",
        description: "From San Marzano tomatoes to fresh buffalo mozzarella imported weekly, we never compromise on the quality of our components.",
        color: "bg-orange-100 text-orange-600",
        delay: 0
    },
    {
        icon: Users,
        title: "Community First",
        description: "We source our produce from local farmers and host weekly pizza-making workshops for neighborhood youth centers.",
        color: "bg-orange-100 text-orange-600",
        delay: 150
    },
    {
        icon: UtensilsCrossed,
        title: "Traditional Craft",
        description: "Our dough is cold-fermented for 48 hours and stretched by hand, ensuring a crust that is both light and complex in flavor.",
        color: "bg-orange-100 text-orange-600",
        delay: 300
    }
]
const AboutValues = () => {
    return (
        <section className="container mx-auto section-gap">
            <div className="text-center mb-16" data-aos="fade-up">
                <div className="flex justify-center items-center mb-12">
                    <div data-aos="fade-right" className="text-center">
                        <MainHeading
                            title=" We don&apos;t just make pizza; we cultivate an experience built on three core pillars of excellence."
                            subTitle="Values That Guide Us"
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
