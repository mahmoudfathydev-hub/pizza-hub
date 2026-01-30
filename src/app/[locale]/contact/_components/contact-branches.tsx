"use client";

import { MapPin } from "lucide-react";
import MainHeading from "@/src/components/main-heading";
import { useTranslations } from "@/src/hooks/use-translations";

const ContactBranches = () => {
  const { t, loading } = useTranslations("contact");

  if (loading || !t) {
    return (
      <section className="container mx-auto section-gap bg-neutral-50 rounded-[3rem] p-8 md:p-16">
        <div className="text-center mb-12">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-48 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-64 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-20 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-32 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-40 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const branches = [
    {
      name: t.branches?.locations?.[0]?.name || "",
      address: t.branches?.locations?.[0]?.address || "",
      hours: t.branches?.locations?.[0]?.hours || "",
      delay: 0,
    },
    {
      name: t.branches?.locations?.[1]?.name || "",
      address: t.branches?.locations?.[1]?.address || "",
      hours: t.branches?.locations?.[1]?.hours || "",
      delay: 100,
    },
    {
      name: t.branches?.locations?.[2]?.name || "",
      address: t.branches?.locations?.[2]?.address || "",
      hours: t.branches?.locations?.[2]?.hours || "",
      delay: 200,
    },
  ];

  return (
    <section className="container mx-auto section-gap bg-neutral-50 rounded-[3rem] p-8 md:p-16">
      <div className="text-center mb-12" data-aos="fade-down">
        <MainHeading
          title={t.branches?.title || ""}
          subTitle={t.branches?.subtitle || ""}
        />
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          {t.branches?.description || ""}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {branches.map((branch, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={branch.delay}
            className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-gray-100 p-3 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors text-gray-500">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full">
                {t.branches?.open || ""}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">{branch.name}</h3>
            <p className="text-muted-foreground text-sm mb-4">
              {branch.address}
            </p>
            <hr className="border-dashed border-gray-200 mb-4" />
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-gray-400">
                {t.branches?.hours || ""}
              </span>
              <span className="font-bold">{branch.hours}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactBranches;
