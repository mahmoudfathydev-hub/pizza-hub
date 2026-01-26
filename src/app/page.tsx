import { db } from "../lib/prisma";
import BestSellers from "./_components/BestSellers";
import Deals from "./_components/Deals";
import Hero from "./_components/Hero";
import Testimonials from "./_components/Testimonails";

export default async function Home() {
  await db.product.deleteMany();
  return (
    <main>
      <Hero />
      <BestSellers />
      <Deals />
      <Testimonials />
    </main>
  );
}
