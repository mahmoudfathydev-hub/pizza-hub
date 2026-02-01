"use server";

import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/lib/prisma";
import getTrans from "@/lib/translation";
import {
  addCategorySchema,
  updateCategorySchema,
} from "@/validations/category";
import { revalidatePath } from "next/cache";
import {
  createSuccessResponse,
  createErrorResponse,
  createValidationErrorResponse,
  createNotFoundResponse,
  ServerActionResponse,
} from "@/lib/response-utils";

export const addCategory = async (
  prevState: unknown,
  formData: FormData,
): Promise<ServerActionResponse> => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale, "categories");
  // Fixed: Add proper type validation for form data
  const formDataObj: Record<string, string> = {};
  formData.forEach((value, key) => {
    if (typeof value === "string") {
      formDataObj[key] = value;
    } else {
      // Convert non-string values to string safely
      formDataObj[key] = String(value);
    }
  });
  const result = addCategorySchema(translations).safeParse(formDataObj);
  if (result.success === false) {
    return createValidationErrorResponse(result.error.flatten().fieldErrors);
  }
  const data = result.data;

  try {
    await db.category.create({
      data,
    });
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
    revalidatePath(`/${locale}/${Routes.MENU}`);

    return createSuccessResponse(
      undefined,
      translations.messages.categoryAdded,
      201,
    );
  } catch (error) {
    console.error("Category creation failed:", error);
    return createErrorResponse("Failed to create category. Please try again.");
  }
};

export const updateCategory = async (
  id: string,
  prevState: unknown,
  formData: FormData,
): Promise<ServerActionResponse> => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale, "categories");
  // Fixed: Add proper type validation for form data
  const formDataObj: Record<string, string> = {};
  formData.forEach((value, key) => {
    if (typeof value === "string") {
      formDataObj[key] = value;
    } else {
      // Convert non-string values to string safely
      formDataObj[key] = String(value);
    }
  });
  const result = updateCategorySchema(translations).safeParse(formDataObj);
  if (result.success === false) {
    return createValidationErrorResponse(result.error.flatten().fieldErrors);
  }
  const data = result.data;

  try {
    // Check if category exists first
    const existingCategory = await db.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return createNotFoundResponse("Category");
    }

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

    return createSuccessResponse(
      undefined,
      translations.messages.updatecategorySucess,
      200,
    );
  } catch (error) {
    console.error("Category update failed:", error);
    return createErrorResponse("Failed to update category. Please try again.");
  }
};

export const deleteCategory = async (
  id: string,
): Promise<ServerActionResponse> => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale, "categories");

  try {
    // Check if category exists first
    const existingCategory = await db.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return createNotFoundResponse("Category");
    }

    await db.category.delete({
      where: {
        id,
      },
    });
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
    revalidatePath(`/${locale}/${Routes.MENU}`);

    return createSuccessResponse(
      undefined,
      translations.messages.deleteCategorySucess,
      200,
    );
  } catch (error) {
    console.error("Category deletion failed:", error);
    return createErrorResponse("Failed to delete category. Please try again.");
  }
};
