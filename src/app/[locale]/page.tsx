import BestSellers from "./_components/BestSellers";
import Deals from "./_components/Deals";
import Hero from "./_components/Hero";
import Testimonials from "./_components/Testimonails";
import { aosAnimations } from "@/utils/aos";
import { Locale } from "@/i18n.config";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <main>
      <div {...aosAnimations.fadeInDown()}>
        <Hero locale={locale} />
      </div>
      <div {...aosAnimations.fadeInUp()}>
        <BestSellers locale={locale} />
      </div>
      <div {...aosAnimations.fadeInUp()}>
        <Deals locale={locale} />
      </div>
      <div {...aosAnimations.fadeInUp()}>
        <Testimonials locale={locale} />
      </div>
    </main>
  );
}
