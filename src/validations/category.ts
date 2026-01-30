import z from "zod";
import { CategoriesTranslations } from "../lib/translation";

export const addCategorySchema = (translations: CategoriesTranslations) => {
  return z.object({
    name: z.string().trim().min(1, {
      message: translations.form.name.validation.required,
    }),
  });
};

export const updateCategorySchema = (translations: CategoriesTranslations) => {
  return z.object({
    categoryName: z.string().trim().min(1, {
      message: translations.form.name.validation.required,
    }),
  });
};
