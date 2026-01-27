import MainHeading from "@/src/components/main-heading"
import Image from "next/image"
import { getCurrentLocale } from "@/src/lib/getCurrentLocale"
import getTrans from "@/src/lib/translation"

const AboutTeam = async () => {
    const locale = await getCurrentLocale()
    const translations = await getTrans(locale, 'about')
    
    const team = [
        {
            name: translations.team.members[0].name,
            role: translations.team.members[0].role,
            bio: translations.team.members[0].bio,
            image: "/Margin.png",
            delay: 0
        },
        {
            name: translations.team.members[1].name,
            role: translations.team.members[1].role,
            bio: translations.team.members[1].bio,
            image: "/Elena.png",
            delay: 100
        },
        {
            name: translations.team.members[2].name,
            role: translations.team.members[2].role,
            bio: translations.team.members[2].bio,
            image: "/David.png",
            delay: 200
        }
    ]

    return (
        <section className="container mx-auto section-gap">
            <div className="flex justify-center items-center mb-12">
                <div data-aos="fade-right" className="text-center">
                    <MainHeading
                        title={translations.team.heading.title}
                        subTitle={translations.team.heading.subtitle}
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
