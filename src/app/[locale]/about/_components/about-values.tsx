"use client";

import MainHeading from "@/components/main-heading";
import { Leaf, Users, UtensilsCrossed } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import getTrans from "@/lib/translation";

const AboutValues = () => {
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
        <div className="text-center mb-12 lg:mb-16">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-48 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-64 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-neutral-50 p-6 lg:p-8 rounded-3xl space-y-4"
            >
              <div className="w-12 h-12 bg-gray-200 rounded-2xl animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const values = [
    {
      icon: Leaf,
      title: translations.values.items[0].title,
      description: translations.values.items[0].description,
      color: "bg-orange-100 text-orange-600",
      delay: 0,
    },
    {
      icon: Users,
      title: translations.values.items[1].title,
      description: translations.values.items[1].description,
      color: "bg-orange-100 text-orange-600",
      delay: 150,
    },
    {
      icon: UtensilsCrossed,
      title: translations.values.items[2].title,
      description: translations.values.items[2].description,
      color: "bg-orange-100 text-orange-600",
      delay: 300,
    },
  ];

  return (
    <section className="container mx-auto section-gap">
      <div className="text-center mb-12 lg:mb-16" data-aos="fade-up">
        <div className="flex justify-center items-center mb-8 lg:mb-12">
          <div data-aos="fade-right" className="text-center">
            <MainHeading
              title={translations.values.heading.title}
              subTitle={translations.values.heading.subtitle}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {values.map((value, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={value.delay}
            className="bg-neutral-50 p-6 lg:p-8 rounded-3xl flex flex-col items-start gap-4 hover:shadow-lg transition-all"
          >
            <div className={`p-4 rounded-2xl ${value.color}`}>
              <value.icon className="w-6 h-6 lg:w-8 lg:h-8" />
            </div>
            <h3 className="text-lg lg:text-xl font-bold">{value.title}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default AboutValues;
