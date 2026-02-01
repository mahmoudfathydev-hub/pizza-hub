"use client";

import MainHeading from "@/components/main-heading";
import { Button } from "@/components/ui/button";
import { Clock, Send } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";

const ContactHero = () => {
  const { t, loading } = useTranslations("contact");

  if (loading || !t) {
    return (
      <section className="container mx-auto section-gap flex flex-col lg:flex-row gap-12 items-start">
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="w-full lg:w-1/2 bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-border/50">
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto section-gap flex flex-col lg:flex-row gap-12 items-start">
      <div
        data-aos="fade-right"
        className="w-full lg:w-1/2 flex flex-col gap-6"
      >
        <div className="flex flex-col items-start justify-between gap-8">
          <MainHeading
            title={t.hero?.title || ""}
            subTitle={t.hero?.subtitle || ""}
          />
        </div>

        <p className="text-muted-foreground text-lg leading-relaxed">
          {t.hero?.description || ""}
        </p>

        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm w-fit mt-4 border border-border/50">
          <div className="bg-orange-100 p-3 rounded-full text-primary">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-foreground">
              {t.hero?.responseTime?.title || ""}
            </p>
            <p className="text-sm text-muted-foreground">
              {t.hero?.responseTime?.description || ""}
            </p>
          </div>
        </div>
      </div>
      <div
        data-aos="fade-left"
        className="w-full lg:w-1/2 bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-border/50"
      >
        <form className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col gap-2 w-full">
              <label className="font-bold text-sm">
                {t.hero?.form?.name?.label || ""}
              </label>
              <input
                type="text"
                placeholder={t.hero?.form?.name?.placeholder || ""}
                className="bg-gray-50 rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="font-bold text-sm">
                {t.hero?.form?.email?.label || ""}
              </label>
              <input
                type="email"
                placeholder={t.hero?.form?.email?.placeholder || ""}
                className="bg-gray-50 rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-sm">
              {t.hero?.form?.subject?.label || ""}
            </label>
            <input
              type="text"
              placeholder={t.hero?.form?.subject?.placeholder || ""}
              className="bg-gray-50 rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-sm">
              {t.hero?.form?.message?.label || ""}
            </label>
            <textarea
              rows={4}
              placeholder={t.hero?.form?.message?.placeholder || ""}
              className="bg-gray-50 rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            ></textarea>
          </div>

          <Button className="w-full py-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
            {t.hero?.form?.submit || ""} <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactHero;
