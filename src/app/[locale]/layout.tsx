import Header from "@/components/header";
import Footer from "@/components/footer/Footer";
import ReduxProvider from "@/provider/ReduxProvider";
import { Directions, Languages } from "@/constants/enums";
import type { Metadata } from "next";
import { Cairo, Roboto } from "next/font/google";
import { Locale } from "@/i18n.config";
import "./globals.css";
import { AOSInit } from "../../components/aos-init";
import { Toaster } from "@/components/ui/sonner";
import NextAuthSessionProvider from "@/provider/NextAuthSessionProvider";
import BackToTop from "@/components/back-to-top";
import { Suspense } from "react";

export async function generateStaticParams() {
  return [{ locale: Languages.ARABIC }, { locale: Languages.ENGLISH }];
}

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
});

const cairo = Cairo({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Pizza Hub",
  description: "created by Eng Mahmoud Fathy",
};

export default async function RootLayout({
  params,
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const locale = (await params).locale as Locale;

  return (
    <html
      lang={locale}
      dir={locale === Languages.ARABIC ? Directions.RTL : Directions.LTR}
    >
      <body
        className={
          locale === Languages.ARABIC ? cairo.className : roboto.className
        }
      >
        <NextAuthSessionProvider>
          <ReduxProvider>
            <AOSInit />
            <Suspense fallback={null}>
              <Header />
            </Suspense>
            <main className="pt-20 md:pt-24">{children}</main>
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
            <Suspense fallback={null}>
              <BackToTop />
            </Suspense>
            <Toaster position="top-center" />
          </ReduxProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
