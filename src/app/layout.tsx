import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "../components/header";
import { AOSInit } from "../components/aos-init";
import Footer from "../components/footer/Footer";
import ReduxProvider from "../provider/ReduxProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
});


export const metadata: Metadata = {
  title: "Pizza Hub",
  description: "Created by Mahmoud Fathy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={roboto.className}
      >
        <ReduxProvider>
          <AOSInit />
          <Header />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
