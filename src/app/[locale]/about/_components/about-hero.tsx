"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import getTrans from "@/lib/translation";

const AboutHero = () => {
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
      <section className="container mx-auto section-gap flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 h-[300px] md:h-[400px] lg:h-[500px] bg-gray-200 rounded-3xl animate-pulse"></div>
        <div className="w-full lg:w-1/2 space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-32"></div>
          <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto section-gap flex flex-col lg:flex-row items-center gap-12">
      <div
        data-aos="fade-right"
        className="w-full lg:w-1/2 relative h-[300px] md:h-[400px] lg:h-[500px] bg-gray-200 rounded-3xl overflow-hidden"
      >
        <Image
          src="/heroabout.png"
          alt={translations.hero.imageAlt || "About Hero Image"}
          fill
          className="object-contain"
          onError={(e) => {
            console.error("Image failed to load:", e);
          }}
          onLoad={() => {
            console.log("Image loaded successfully");
          }}
        />
      </div>

      <div data-aos="fade-left" className="w-full lg:w-1/2 flex flex-col gap-6">
        <div className="inline-block bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-bold w-fit">
          {translations.hero.badge}
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight text-foreground">
          {translations.hero.title
            .split(" ")
            .map((word: string, index: number) => (
              <span
                key={index}
                className={word === "Wood-Fired" ? "text-primary" : undefined}
              >
                {word}{" "}
              </span>
            ))}
        </h1>

        <div className="flex flex-col gap-4 text-muted-foreground text-base lg:text-lg leading-relaxed">
          {translations.hero.description.map(
            (paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ),
          )}
        </div>

        <div className="flex gap-4 mt-4">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
            <span className="font-bold text-foreground">
              {translations.hero.stats.count}
            </span>
            <span className="text-sm text-neutral-500">
              {translations.hero.stats.label}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
