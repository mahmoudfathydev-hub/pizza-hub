import Link from "@/components/link";
import { buttonVariants } from "@/components/ui/button";
import { Languages, Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  locale: Locale;
}

async function Hero({ locale }: HeroProps) {
  const translations = await getTrans(locale, "home");

  return (
    <section className="section-gap">
      <div className="container grid grid-cols-1 md:grid-cols-2">
        <div className="text md:py-12 ">
          <h1 className="text-4xl font-semibold">{translations.hero.title}</h1>
          <p className="text-accent my-4">{translations.hero.description}</p>
          <div className="btns flex items-center gap-4">
            <Link
              href={`/${Routes.MENU}`}
              className={`${buttonVariants({ size: "lg" })} 
                        space-x-2 px-4! rounded-full! uppercase`}
            >
              {translations.hero.primaryCta}
              <ArrowRightCircle className={`w-5! h-5! ${locale === Languages.ARABIC ? 'rotate-180 ' : ''}`} />
            </Link>
            <Link
              href={`/${Routes.ABOUT}`}
              className="flex gap-2 items-center text-black hover:text-primary duration-300 transition-all font-semibold"
            >
              {translations.hero.secondaryCta}
              <ArrowRightCircle className={`w-5! h-5! ${locale === Languages.ARABIC ? 'rotate-180 ' : ''}`}
              />
            </Link>
          </div>
        </div>
        <div className="img relative hidden md:block h-96">
          <Image
            src="/pizza.png"
            alt={translations.hero.imageAlt}
            fill
            loading="eager"
            priority
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
