import { i18n, Locale } from "@/i18n.config";
import { headers } from "next/headers";

export const getCurrentLocale = async (): Promise<Locale> => {
  try {
    const url = (await headers()).get("x-url");

    if (!url) {
      console.warn(
        "No x-url header found in getCurrentLocale, using default locale",
      );
      return i18n.defaultLocale;
    }

    const urlParts = url.split("/");
    const locale = urlParts[3] as Locale;

    // Validate that the locale is supported
    if (i18n.locales.includes(locale)) {
      return locale;
    }

    console.warn(`Unsupported locale "${locale}" found, using default locale`);
    return i18n.defaultLocale;
  } catch (error) {
    console.error("Error in getCurrentLocale:", error);
    return i18n.defaultLocale;
  }
};
