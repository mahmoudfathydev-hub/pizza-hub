import BestSellers from "./_components/BestSellers";
import Deals from "./_components/Deals";
import Hero from "./_components/Hero";
import Testimonials from "./_components/Testimonails";
import { aosAnimations } from "@/utils/aos";

export default async function Home() {
  return (
    <main>
      <div {...aosAnimations.fadeInDown()}>
        <Hero />
      </div>
      <div {...aosAnimations.fadeInUp()}>
        <BestSellers />
      </div>
      <div {...aosAnimations.fadeInUp()}>
        <Deals />
      </div>
      <div {...aosAnimations.fadeInUp()}>
        <Testimonials />
      </div>
    </main>
  );
}
