import z from "zod";
import { MenuItemsTranslations } from "../lib/translation";

export const addProductSchema = (translations: MenuItemsTranslations) => {
  return z.object({
    name: z.string().trim().min(1, {
      message: translations.form.name.validation.required,
    }),
    description: z.string().trim().min(1, {
      message: translations.form.description.validation.required,
    }),
    basePrice: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Base price must be a valid positive number",
    }),
    image: z.any().optional(),
  });
};

export const updateProductSchema = (translations: MenuItemsTranslations) => {
  return z.object({
    name: z.string().trim().min(1, {
      message: translations.form.name.validation.required,
    }),
    description: z.string().trim().min(1, {
      message: translations.form.description.validation.required,
    }),
    basePrice: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Base price must be a valid positive number",
    }),
    image: z.any().optional(),
  });
};
