import { Translations } from "@/types/Translations";
import { z } from "zod";
import { sanitizeInput, validateField } from "@/lib/security";

const imageValidation = (translations: Translations, isRequired: boolean) => {
  return !isRequired
    ? z.custom((val) => !val || val instanceof File) // Allow empty for updates
    : z.custom(
        (val) => {
          if (typeof val !== "object" || !val) {
            return false;
          }
          if (!(val instanceof File)) {
            return false;
          }

          // File size validation (8MB limit to match client-side)
          const MAX_FILE_SIZE = 8 * 1024 * 1024;
          if (val.size > MAX_FILE_SIZE) {
            return false;
          }

          const validMimeTypes = [
            "image/jpeg",
            "image/jfif", // Added JFIF support
            "image/png",
            "image/gif",
            "image/webp",
          ];
          const isValidMimeType = validMimeTypes.includes(val.type);

          return isValidMimeType;
        },
        {
          message:
            translations.admin?.["menu-items"]?.form?.image?.validation
              ?.required ||
            "Invalid image file. Must be JPEG, JFIF, PNG, GIF, or WebP and under 8MB.",
        },
      );
};
const getCommonValidations = (translations: Translations) => {
  return {
    name: z
      .string()
      .transform((val) => sanitizeInput(val.trim(), 100)) // Sanitize and limit length
      .refine((val) => val.length >= 1, {
        message:
          translations.admin["menu-items"].form.name.validation.required ||
          "Name is required",
      })
      .refine((val) => validateField("name", val).isValid, {
        message: "Name contains invalid characters",
      }),
    description: z
      .string()
      .transform((val) => sanitizeInput(val.trim(), 2000)) // Sanitize and limit length
      .refine((val) => val.length >= 1, {
        message:
          translations.admin["menu-items"].form.description.validation
            .required || "Description is required",
      })
      .refine((val) => validateField("description", val).isValid, {
        message: "Description contains invalid characters",
      }),
    basePrice: z
      .string()
      .transform((val) => val.trim())
      .refine((val) => val.length > 0, {
        message:
          translations.admin["menu-items"].form.basePrice.validation.required ||
          "Price is required",
      })
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Price must be a valid positive number",
      })
      .refine((val) => Number(val) <= 99999.99, {
        message: "Price cannot exceed $99,999.99",
      })
      .refine((val) => validateField("price", val).isValid, {
        message: "Invalid price format",
      }),
    categoryId: z.string().min(1, {
      message:
        translations.admin["menu-items"].form.category.validation.required ||
        "Category is required",
    }),
  };
};
export const addProductSchema = (translations: Translations) => {
  return z.object({
    ...getCommonValidations(translations),
    image: imageValidation(translations, true),
  });
};
export const updateProductSchema = (translations: Translations) => {
  return z.object({
    ...getCommonValidations(translations),
    image: imageValidation(translations, false),
  });
};
