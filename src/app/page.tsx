import BestSellers from "./_components/BestSellers";
import Hero from "./_components/Hero";
import { db } from "@/src/lib/prisma"; // استيراد الـ PrismaClient

export default async function Home() {
  // جلب كل المنتجات من قاعدة البيانات
  const products = await db.product.findMany();

  console.log(products)
  return (
    <main>
      <Hero />
      <BestSellers />
    </main>
  );
}
