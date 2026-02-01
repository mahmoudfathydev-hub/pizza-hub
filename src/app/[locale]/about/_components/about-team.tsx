"use client";

import MainHeading from "@/components/main-heading";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import getTrans from "@/lib/translation";

const AboutTeam = () => {
  const [translations, setTranslations] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const locale = (params.locale as string) || "en";

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const trans = await getTrans(locale as any, "about");
        setTranslations(trans);
      } catch (error) {
        console.error("Failed to load translations:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTranslations();
  }, [locale]);

  if (loading || !translations) {
    return (
      <section className="container mx-auto section-gap">
        <div className="text-center mb-8 lg:mb-12">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-48 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-64 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <div className="h-[250px] md:h-[300px] lg:h-[400px] bg-gray-200 rounded-2xl animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
              <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const team = [
    {
      name: translations.team.members[0].name,
      role: translations.team.members[0].role,
      bio: translations.team.members[0].bio,
      image: "/Margin.png",
      delay: 0,
    },
    {
      name: translations.team.members[1].name,
      role: translations.team.members[1].role,
      bio: translations.team.members[1].bio,
      image: "/Elena.png",
      delay: 100,
    },
    {
      name: translations.team.members[2].name,
      role: translations.team.members[2].role,
      bio: translations.team.members[2].bio,
      image: "/David.png",
      delay: 200,
    },
  ];

  return (
    <section className="container mx-auto section-gap">
      <div className="flex justify-center items-center mb-8 lg:mb-12">
        <div data-aos="fade-right" className="text-center">
          <MainHeading
            title={translations.team.heading.title}
            subTitle={translations.team.heading.subtitle}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {team.map((member, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={member.delay}
            className="group"
          >
            <div className="h-[250px] md:h-[300px] lg:h-[400px] w-full bg-gray-200 rounded-2xl mb-6 overflow-hidden relative">
              <Image
                src={member.image}
                alt={`Team member ${member.name}`}
                fill
                className="object-cover"
                onError={(e) => {
                  console.error(`Failed to load image: ${member.name}`, e);
                }}
                onLoad={() => {
                  console.log(`Image loaded successfully: ${member.name}`);
                }}
              />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold">{member.name}</h3>
            <p className="text-primary font-medium text-xs sm:text-sm mb-3 uppercase tracking-wider">
              {member.role}
            </p>
            <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
              {member.bio}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutTeam;
