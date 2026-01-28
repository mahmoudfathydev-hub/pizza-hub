"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "@/src/hooks/use-translations";

const ContactInfo = () => {
  const { translations: t, loading } = useTranslations("contact");

  if (loading || !t) {
    return (
      <section className="container mx-auto section-gap">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-neutral-50 rounded-[2rem] p-8 flex flex-col items-center text-center gap-4"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
              <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto section-gap">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Call Us */}
        <div
          data-aos="fade-up"
          data-aos-delay="0"
          className="bg-neutral-50 rounded-[2rem] p-8 flex flex-col items-center text-center gap-4 hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-border/50"
        >
          <div className="bg-orange-100 p-4 rounded-full text-primary mb-2">
            <Phone className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold">{t.info?.call?.title || ""}</h3>
          <p className="text-muted-foreground">
            {t.info?.call?.description || ""}
          </p>
          <p className="text-xl font-bold text-primary">
            {t.info?.call?.phone || ""}
          </p>
        </div>

        {/* Visit Us */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="bg-neutral-50 rounded-[2rem] p-8 flex flex-col items-center text-center gap-4 hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-border/50"
        >
          <div className="bg-orange-100 p-4 rounded-full text-primary mb-2">
            <MapPin className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold">{t.info?.visit?.title || ""}</h3>
          <p className="text-muted-foreground">
            {t.info?.visit?.description || ""}
          </p>
          <p className="text-xl font-bold text-primary max-w-[200px]">
            {t.info?.visit?.address || ""}
          </p>
        </div>

        {/* Email Us */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="bg-neutral-50 rounded-[2rem] p-8 flex flex-col items-center text-center gap-4 hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-border/50"
        >
          <div className="bg-orange-100 p-4 rounded-full text-primary mb-2">
            <Mail className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold">{t.info?.email?.title || ""}</h3>
          <p className="text-muted-foreground">
            {t.info?.email?.description || ""}
          </p>
          <p className="text-xl font-bold text-primary">
            {t.info?.email?.email || ""}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
