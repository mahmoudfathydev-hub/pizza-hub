import MainHeading from "@/src/components/main-heading"
import Image from "next/image"

const team = [
    {
        name: "Marco Rossi",
        role: "Founder & Master Pizzaiolo",
        bio: "With 25 years of experience in Naples, Marco brought his secret sourdough starter and passion for wood-fire to found PizzaHub.",
        image: "/Margin.png",
        delay: 0
    },
    {
        name: "Elena Valli",
        role: "Head of Culinary Development",
        bio: "Elena specializes in flavor chemistry, ensuring our unique toppings like Truffle Honey and Spicy Salami perfectly balance our crust.",
        image: "/Elena.png",
        delay: 100
    },
    {
        name: "David Chen",
        role: "Operations Director",
        bio: "The mind behind our ultra-fast delivery system, David ensures that your pizza arrives as hot as it was when it left the stone.",
        image: "/David.png",
        delay: 200
    }
]

const AboutTeam = () => {
    return (
        <section className="container mx-auto section-gap">
            <div className="flex justify-center items-center mb-12">
                <div data-aos="fade-right" className="text-center">
                    <MainHeading
                        title="The passionate people behind the fire."
                        subTitle="Meet the Visionaries"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {team.map((member, index) => (
                    <div
                        key={index}
                        data-aos="fade-up"
                        data-aos-delay={member.delay}
                        className="group"
                    >
                        <div className="h-75 md:h-100 w-full bg-gray-200 rounded-2xl mb-6 overflow-hidden relative">
                            <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h3 className="text-2xl font-bold">{member.name}</h3>
                        <p className="text-primary font-medium text-sm mb-3 uppercase tracking-wider">{member.role}</p>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                            {member.bio}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default AboutTeam
