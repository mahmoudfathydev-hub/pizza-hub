import * as z from "zod";
import { Translations } from "@/src/types/Translations";
import { AuthTranslations } from "@/src/lib/translation";

export const loginSchema = (translations: Translations | AuthTranslations) => {
  return z.object({
    email: z.string().trim().email({
      message: translations.validation.validEmail,
    }),
    password: z
      .string()
      .min(6, { message: translations.validation.passwordMinLength })
      .max(40, { message: translations.validation.passwordMaxLength }),
  });
};

export const signUpSchema = (translations: Translations | AuthTranslations) => {
  return z
    .object({
      name: z
        .string()
        .trim()
        .min(1, { message: translations.validation.nameRequired }),
      email: z.string().trim().email({
        message: translations.validation.validEmail,
      }),
      password: z
        .string()
        .min(6, { message: translations.validation.passwordMinLength })
        .max(40, { message: translations.validation.passwordMaxLength }),
      confirmPassword: z
        .string()
        .min(6, { message: translations.validation.confirmPasswordRequired }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: translations.validation.passwordMismatch,
      path: ["confirmPassword"],
    });
};

export type ValidationErrors =
  | {
      [key: string]: string[];
    }
  | undefined;
