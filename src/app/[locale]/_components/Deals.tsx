import Link from "@/src/components/link";
import MainHeading from "@/src/components/main-heading";
import { Routes } from "@/src/constants/enums";
import { getCurrentLocale } from "@/src/lib/getCurrentLocale";
import getTrans from "@/src/lib/translation";
import Image from "next/image";

const Deals = async () => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale, "home");
  const { deals } = translations;

  return (
    <section className="container mx-auto section-gap">
      <div
        data-aos="fade-down"
        data-aos-delay="200"
        className="flex flex-col items-center gap-2 mb-8"
      >
        <MainHeading title={deals.heading.title} subTitle="" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          data-aos="fade-right"
          className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[oklch(0.65_0.25_35)] to-gray-700 p-8 md:p-12 shadow-md transition-all hover:shadow-lg"
        >
          <div className="relative z-10 flex flex-col items-start gap-4 h-full justify-center">
            <span className="font-bold tracking-widest text-primary-foreground/90 uppercase text-sm">
              {deals.weeklySpecial.badge}
            </span>
            <h3 className="font-extrabold text-4xl text-primary-foreground sm:text-5xl leading-none">
              {deals.weeklySpecial.title}
            </h3>
            <p className="max-w-[85%] text-lg font-medium text-primary-foreground/90 leading-relaxed">
              {deals.weeklySpecial.description}
            </p>
            <Link
              href={`/${Routes.MENU}`}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-bold text-primary transition-colors hover:bg-neutral-100"
            >
              {deals.weeklySpecial.cta}
            </Link>
          </div>
          <div className="absolute right-5 bottom-15 h-48 w-48 opacity-20 pointer-events-none">
            <Image
              src="/fork.png"
              alt="Decoration"
              fill
              className="object-contain"
              sizes="192px"
            />
          </div>
        </div>
        <div
          data-aos="fade-left"
          data-aos-delay="200"
          className="relative overflow-hidden rounded-3xl bg-gray-900 p-8 md:p-12 shadow-md transition-all hover:shadow-lg"
        >
          <div className="relative z-10 flex flex-col items-start gap-4 h-full justify-center">
            <span className="font-bold tracking-widest text-primary uppercase text-sm">
              {deals.limitedTime.badge}
            </span>
            <h3 className="font-extrabold text-4xl text-white sm:text-5xl leading-none">
              {deals.limitedTime.title}
            </h3>
            <p className="max-w-[85%] text-lg font-medium text-gray-300 leading-relaxed">
              {deals.limitedTime.description}
            </p>
            <Link
              href={`/${Routes.MENU}`}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-bold text-white transition-colors hover:bg-primary/90"
            >
              {deals.limitedTime.cta}
            </Link>
          </div>
          <div className="absolute right-0 bottom-0 h-48 w-48 opacity-20 pointer-events-none">
            <Image
              src="/Vector.png"
              alt="Decoration"
              fill
              className="object-contain"
              sizes="192px"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Deals;
