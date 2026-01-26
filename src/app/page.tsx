import { db } from "../lib/prisma";
import BestSellers from "./_components/BestSellers";
import Hero from "./_components/Hero";

export default async function Home() {
  await db.product.deleteMany();
  return (
    <main>
      <Hero />
      <BestSellers />
    </main>
  );
}
