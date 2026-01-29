import z, { email } from "zod";
import { ProfileTranslations } from "../types/ProfileTranslations";

export const updateProfileSchema = (translations: ProfileTranslations) => {
    return z.object({
        name: z
            .string()
            .trim()
            .min(1, { message: "Name is required" }),
        email: z.string().trim().email({
            message: "Please enter a valid email",
        }),
        phone: z
            .string()
            .trim()
            .optional()
            .refine(
                (value) => {
                    if (!value) return true;
                    return /^\+?[1-9]\d{1,14}$/.test(value);
                },
                {
                    message: translations.form.phone.validation?.invalid || "Please enter a valid phone number",
                }
            ),
        streetAddress: z.string().optional(),
        postalCode: z
            .string()
            .optional()
            .refine(
                (value) => {
                    if (!value) return true;
                    return /^\d{5,10}$/.test(value);
                },
                {
                    message: translations.form.postalCode.validation?.invalid || "Please enter a valid postal code",
                }
            ),
        city: z.string().optional(),
        country: z.string().optional(),
        image: z.custom((val) => val instanceof File).optional(),
    });
};