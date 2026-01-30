"use server";

import { Pages, Routes } from "@/src/constants/enums";
import { getCurrentLocale } from "@/src/lib/getCurrentLocale";
import { db } from "@/src/lib/prisma";
import getTrans from "@/src/lib/translation";
import {
    addCategorySchema,
    updateCategorySchema,
} from "@/src/validations/category";
import { revalidatePath } from "next/cache";

export const addCategory = async (prevState: unknown, formData: FormData) => {
    const locale = await getCurrentLocale();
    const translations = await getTrans(locale, "categories");
    const formDataObj: Record<string, string> = {};
    formData.forEach((value, key) => {
        formDataObj[key] = value.toString();
    });
    const result = addCategorySchema(translations).safeParse(formDataObj);
    if (result.success === false) {
        return {
            error: result.error.flatten().fieldErrors,
            status: 400,
        };
    }
    const data = result.data;

    try {
        await db.category.create({
            data,
        });
        revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
        revalidatePath(`/${locale}/${Routes.MENU}`);

        return {
            status: 201,
            message: translations.messages.categoryAdded,
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            message: "An unexpected error occurred",
        };
    }
};

export const updateCategory = async (
    id: string,
    prevState: unknown,
    formData: FormData,
) => {
    const locale = await getCurrentLocale();
    const translations = await getTrans(locale, "categories");
    const formDataObj: Record<string, string> = {};
    formData.forEach((value, key) => {
        formDataObj[key] = value.toString();
    });
    const result = updateCategorySchema(translations).safeParse(formDataObj);
    if (result.success === false) {
        return {
            error: result.error.flatten().fieldErrors,
            status: 400,
        };
    }
    const data = result.data;

    try {
        await db.category.update({
            where: {
                id,
            },
            data: {
                name: data.categoryName,
            },
        });
        revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
        revalidatePath(`/${locale}/${Routes.MENU}`);

        return {
            status: 200,
            message: translations.messages.updatecategorySucess,
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            message: "An unexpected error occurred",
        };
    }
};

export const deleteCategory = async (id: string) => {
    const locale = await getCurrentLocale();
    const translations = await getTrans(locale, "categories");

    try {
        await db.category.delete({
            where: {
                id,
            },
        });
        revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
        revalidatePath(`/${locale}/${Routes.MENU}`);
        return {
            status: 200,
            message: translations.messages.deleteCategorySucess,
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            message: "An unexpected error occurred",
        };
    }
};
