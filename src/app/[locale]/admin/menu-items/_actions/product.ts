"use server";

import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/lib/prisma";
import getTrans from "@/lib/translation";
import {
  addProductSchema,
  updateProductSchema,
} from "@/validations/product";
import {
  Extra,
  ExtraIngredients,
  ProductSizes,
  Size,
  Category,
} from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { Translations } from "@/types/Translations";
import { MenuItemsTranslations } from "@/lib/translation";

// ------------------
// Type-safe response interfaces
// ------------------
interface ProductActionResponse {
  status: number;
  message?: string;
  error?: Record<string, string[]>;
  formData?: FormData;
}

// ------------------
// Helper function to convert MenuItemsTranslations to Translations format
// ------------------
const menuItemsToValidationTranslations = (
  menuItems: MenuItemsTranslations,
): Translations => {
  return {
    logo: "Pizza Hub",
    home: {
      hero: { title: "", description: "", orderNow: "", learnMore: "" },
      bestSeller: { checkOut: "", OurBestSellers: "" },
      about: {
        ourStory: "",
        aboutUs: "",
        descriptions: { one: "", two: "", three: "" },
      },
      contact: { "Don'tHesitate": "", contactUs: "" },
    },
    navbar: {
      home: "",
      about: "",
      menu: "",
      contact: "",
      login: "",
      register: "",
      logout: "",
      profile: "",
      user: "",
      admin: "",
    },
    auth: {
      login: {
        title: "",
        name: { label: "", placeholder: "", validation: { required: "" } },
        email: { label: "", placeholder: "", validation: { required: "" } },
        password: { label: "", placeholder: "", validation: { required: "" } },
        submit: "",
        authPrompt: { message: "", signUpLinkText: "" },
      },
      register: {
        title: "",
        name: { label: "", placeholder: "", validation: { required: "" } },
        email: { label: "", placeholder: "", validation: { required: "" } },
        password: { label: "", placeholder: "", validation: { required: "" } },
        confirmPassword: {
          label: "",
          placeholder: "",
          validation: { required: "" },
        },
        submit: "",
        authPrompt: { message: "", loginLinkText: "" },
      },
    },
    validation: {
      nameRequired: "",
      validEmail: "",
      passwordMinLength: "",
      passwordMaxLength: "",
      confirmPasswordRequired: "",
      passwordMismatch: "",
    },
    menuItem: { addToCart: "" },
    messages: {
      userNotFound: "",
      incorrectPassword: "",
      loginSuccessful: "",
      unexpectedError: "",
      userAlreadyExists: "",
      accountCreated: "",
      updateProfileSucess: "",
      categoryAdded: "",
      updatecategorySucess: "",
      deleteCategorySucess: "",
      productAdded: menuItems.messages.menuItemAdded,
      updateProductSucess: menuItems.messages.updateMenuItemSuccess,
      deleteProductSucess: menuItems.messages.deleteMenuItemSuccess,
      updateUserSucess: "",
      deleteUserSucess: "",
    },
    cart: { title: "", noItemsInCart: "" },
    profile: {
      title: "",
      form: {
        name: { label: "", placeholder: "" },
        email: { label: "", placeholder: "" },
        phone: { label: "", placeholder: "" },
        address: { label: "", placeholder: "" },
        postalCode: { label: "", placeholder: "" },
        city: { label: "", placeholder: "" },
        country: { label: "", placeholder: "" },
      },
    },
    admin: {
      tabs: {
        profile: "",
        categories: "",
        menuItems: "",
        users: "",
        orders: "",
      },
      categories: {
        form: {
          editName: "",
          name: { label: "", placeholder: "", validation: { required: "" } },
        },
      },
      "menu-items": {
        addItemSize: menuItems.addItemSize,
        createNewMenuItem: menuItems.createNewMenuItem,
        addExtraItem: menuItems.addExtraItem,
        menuOption: menuItems.menuOption,
        form: {
          name: {
            label: menuItems.form.name.label,
            placeholder: menuItems.form.name.placeholder,
            validation: { required: menuItems.form.name.validation.required },
          },
          description: {
            label: menuItems.form.description.label,
            placeholder: menuItems.form.description.placeholder,
            validation: {
              required: menuItems.form.description.validation.required,
            },
          },
          basePrice: {
            label: menuItems.form.basePrice.label,
            placeholder: menuItems.form.basePrice.placeholder,
            validation: {
              required: menuItems.form.basePrice.validation.required,
            },
          },
          category: {
            validation: {
              required: menuItems.form.category.validation.required,
            },
          },
          image: {
            validation: { required: menuItems.form.image.validation.required },
          },
        },
      },
    },
    sizes: menuItems.sizes,
    extrasIngredients: menuItems.extrasIngredients,
    delete: menuItems.delete,
    cancel: menuItems.cancel,
    create: menuItems.create,
    save: menuItems.save,
    category: "",
    copyRight: "",
    noProductsFound: menuItems.noMenuItemsFound,
  };
};

// ------------------
// Image upload helper with proper error handling and timeout
// ------------------
const getImageUrl = async (imageFile: File): Promise<string | undefined> => {
  if (!imageFile || imageFile.size === 0) return undefined;

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("pathName", "product_images");

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
      {
        method: "POST",
        body: formData,
        signal: controller.signal,
      },
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.url) {
      throw new Error("No URL returned from upload service");
    }

    return result.url;
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Upload timed out. Please try again.");
    }
    throw error;
  }
};

// ------------------
// Add Product - Fixed with image upload first, then database transaction
// ------------------
export const addProduct = async (
  args: {
    categoryId: string;
    options: { sizes: Partial<Size>[]; extras: Partial<Extra>[] };
  },
  prevState: unknown,
  formData: FormData,
): Promise<ProductActionResponse> => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale, "menuItems");

  // Convert FormData to object with proper File handling
  const formDataObj: Record<string, string | File> = {};
  formData.forEach((value, key) => {
    if (value instanceof File) {
      formDataObj[key] = value;
    } else {
      formDataObj[key] = value.toString();
    }
  });

  const result = addProductSchema(
    menuItemsToValidationTranslations(translations),
  ).safeParse(formDataObj);

  if (result.success === false) {
    return {
      error: result.error.flatten().fieldErrors,
      status: 400,
      formData,
    };
  }

  const data = result.data;
  const basePrice = Number(data.basePrice);
  const imageFile = data.image;

  // Validate image file type
  if (!(imageFile instanceof File)) {
    return {
      status: 400,
      message: "Invalid image file format",
      error: { image: ["Invalid image file format"] },
    };
  }

  // STEP 1: Upload image FIRST before any database operation
  let imageUrl: string | undefined;
  try {
    imageUrl = await getImageUrl(imageFile);
  } catch (uploadError) {
    return {
      status: 400,
      message: "Image upload failed. Please try again.",
      error: { image: ["Image upload failed. Please try again."] },
    };
  }

  // STEP 2: Database transaction - all or nothing
  try {
    const product = await db.$transaction(async (tx) => {
      // Create product with image URL
      const newProduct = await tx.product.create({
        data: {
          name: data.name,
          description: data.description,
          basePrice,
          image: imageUrl || "",
          categoryId: args.categoryId,
        },
      });

      // Create sizes if provided
      if (args.options.sizes && args.options.sizes.length > 0) {
        const validSizes = args.options.sizes
          .filter((s) => s.name && s.price !== undefined)
          .map((s) => ({
            productId: newProduct.id,
            name: s.name as ProductSizes,
            price: Number(s.price),
          }));

        if (validSizes.length > 0) {
          await tx.size.createMany({ data: validSizes });
        }
      }

      // Create extras if provided
      if (args.options.extras && args.options.extras.length > 0) {
        const validExtras = args.options.extras
          .filter((e) => e.name && e.price !== undefined)
          .map((e) => ({
            productId: newProduct.id,
            name: e.name as ExtraIngredients,
            price: Number(e.price),
          }));

        if (validExtras.length > 0) {
          await tx.extra.createMany({ data: validExtras });
        }
      }

      return newProduct;
    });

    // STEP 3: Cache revalidation ONLY after successful transaction
    revalidatePath(`/${locale}/${Routes.MENU}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`);
    revalidatePath(`/${locale}`);

    // Critical: Invalidate cached database queries
    revalidateTag("products", "max");
    revalidateTag("products-by-category", "max");
    revalidateTag("best-sellers", "max");

    return {
      status: 201,
      message: translations.messages.menuItemAdded,
    };
  } catch (error) {
    console.error("Product creation failed:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      productName: data.name,
      categoryId: args.categoryId,
      timestamp: new Date().toISOString(),
    });
    return {
      status: 500,
      message: "Failed to create product. Please try again.",
    };
  }
};

// ------------------
// Update Product - Fixed with image upload first, then database transaction
// ------------------
export const updateProduct = async (
  args: {
    productId: string;
    options: { sizes: Partial<Size>[]; extras: Partial<Extra>[] };
  },
  prevState: unknown,
  formData: FormData,
): Promise<ProductActionResponse> => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale, "menuItems");

  // Convert FormData to object with proper File handling
  const formDataObj: Record<string, string | File> = {};
  formData.forEach((value, key) => {
    if (value instanceof File) {
      formDataObj[key] = value;
    } else {
      formDataObj[key] = value.toString();
    }
  });

  const result = updateProductSchema(
    menuItemsToValidationTranslations(translations),
  ).safeParse(formDataObj);

  if (result.success === false) {
    return {
      error: result.error.flatten().fieldErrors,
      status: 400,
      formData,
    };
  }

  const data = result.data;
  const basePrice = Number(data.basePrice);
  const imageFile = data.image;

  // Validate image file type if provided
  if (imageFile && !(imageFile instanceof File)) {
    return {
      status: 400,
      message: "Invalid image file format",
      error: { image: ["Invalid image file format"] },
    };
  }

  // Type guard: now imageFile is either undefined or File
  const validatedImageFile = imageFile as File | undefined;

  // Validate product exists
  const existingProduct = await db.product.findUnique({
    where: { id: args.productId },
  });

  if (!existingProduct) {
    return {
      status: 404,
      message: "Product not found",
    };
  }

  // STEP 1: Upload image FIRST if new image provided
  let imageUrl: string | undefined;
  if (validatedImageFile && validatedImageFile.size > 0) {
    try {
      imageUrl = await getImageUrl(validatedImageFile);
    } catch (uploadError) {
      return {
        status: 400,
        message: "Image upload failed. Please try again.",
        error: { image: ["Image upload failed. Please try again."] },
      };
    }
  }

  // STEP 2: Database transaction - all or nothing
  try {
    const updatedProduct = await db.$transaction(async (tx) => {
      // Update product
      const product = await tx.product.update({
        where: {
          id: args.productId,
        },
        data: {
          name: data.name,
          description: data.description,
          basePrice,
          image: imageUrl ?? existingProduct.image,
        },
      });

      // Delete and recreate sizes
      await tx.size.deleteMany({
        where: { productId: args.productId },
      });

      if (args.options.sizes && args.options.sizes.length > 0) {
        console.log("Processing sizes:", args.options.sizes);

        const validSizes = args.options.sizes
          .filter((s) => s.name && s.price !== undefined)
          .map((s) => ({
            productId: args.productId,
            name: s.name as ProductSizes,
            price: Number(s.price),
          }));

        console.log("Valid sizes to create:", validSizes);

        if (validSizes.length > 0) {
          await tx.size.createMany({ data: validSizes });
        }
      }

      // Delete and recreate extras
      await tx.extra.deleteMany({
        where: { productId: args.productId },
      });

      if (args.options.extras && args.options.extras.length > 0) {
        const validExtras = args.options.extras
          .filter((e) => e.name && e.price !== undefined)
          .map((e) => ({
            productId: args.productId,
            name: e.name as ExtraIngredients,
            price: Number(e.price),
          }));

        if (validExtras.length > 0) {
          await tx.extra.createMany({ data: validExtras });
        }
      }

      return product;
    });

    // STEP 3: Cache revalidation ONLY after successful transaction
    revalidatePath(`/${locale}/${Routes.MENU}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`);
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${updatedProduct.id}/${Pages.EDIT}`,
    );
    revalidatePath(`/${locale}`);

    // Critical: Invalidate cached database queries
    revalidateTag("products", "max");
    revalidateTag("products-by-category", "max");
    revalidateTag("best-sellers", "max");

    return {
      status: 200,
      message: translations.messages.updateMenuItemSuccess,
    };
  } catch (error) {
    console.error("Product update failed:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      productId: args.productId,
      productName: data.name,
      timestamp: new Date().toISOString(),
    });
    return {
      status: 500,
      message: "Failed to update product. Please try again.",
    };
  }
};

// ------------------
// Delete Product - Fixed with proper error handling
// ------------------
export const deleteProduct = async (
  id: string,
): Promise<ProductActionResponse> => {
  // Validate ID format - Product IDs use CUID format, not UUID
  const idSchema = z.string().min(1, "Invalid product ID format");
  const idValidation = idSchema.safeParse(id);

  if (!idValidation.success) {
    return {
      status: 400,
      message: "Invalid product ID format",
    };
  }

  const locale = await getCurrentLocale();
  const translations = await getTrans(locale, "menuItems");

  try {
    await db.product.delete({
      where: { id },
    });

    // Cache revalidation after successful deletion
    revalidatePath(`/${locale}/${Routes.MENU}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`);
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${id}/${Pages.EDIT}`,
    );
    revalidatePath(`/${locale}`);

    // Critical: Invalidate cached database queries
    revalidateTag("products", "max");
    revalidateTag("products-by-category", "max");
    revalidateTag("best-sellers", "max");

    return {
      status: 200,
      message: translations.messages.deleteMenuItemSuccess,
    };
  } catch (error) {
    console.error("Product deletion failed:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      productId: id,
      timestamp: new Date().toISOString(),
    });
    return {
      status: 500,
      message: "Failed to delete product. Please try again.",
    };
  }
};
