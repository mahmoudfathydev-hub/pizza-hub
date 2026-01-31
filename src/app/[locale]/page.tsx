import BestSellers from "./_components/BestSellers";
import Deals from "./_components/Deals";
import Hero from "./_components/Hero";
import Testimonials from "./_components/Testimonails";

export default async function Home() {
  return (
    <main>
      <Hero />
      <BestSellers />
      <Deals />
      <Testimonials />
    </main>
  );
}
