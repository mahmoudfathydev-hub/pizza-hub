"use server";

import { Pages, Routes } from "@/src/constants/enums";
import { getCurrentLocale } from "@/src/lib/getCurrentLocale";
import { db } from "@/src/lib/prisma";
import getTrans from "@/src/lib/translation";
import {
  addProductSchema,
  updateProductSchema,
} from "@/src/validations/product";
import {
  Extra,
  ExtraIngredients,
  ProductSizes,
  Size,
  Category,
} from "@prisma/client";
import { revalidatePath } from "next/cache";

const getImageUrl = async (imageFile: File) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("pathName", "product_images");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
      {
        method: "POST",
        body: formData,
      },
    );
    console.log(response);
    const image = (await response.json()) as { url: string };
    return image.url;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
  }
};

export const addProduct = async (
  args: {
    categoryId: string;
    options: { sizes: Partial<Size>[]; extras: Partial<Extra>[] };
  },
  prevState: unknown,
  formData: FormData,
) => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale, "menuItems");
  const result = addProductSchema(translations).safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (result.success === false) {
    return {
      error: result.error.flatten().fieldErrors,
      status: 400,
      formData,
    };
  }
  const data = result.data;
  const basePrice = Number(data.basePrice);
  const imageFile = data.image as File;
  const imageUrl = Boolean(imageFile.size)
    ? await getImageUrl(imageFile)
    : undefined;
  try {
    await db.product.create({
      data: {
        ...data,
        image: imageUrl || "",
        basePrice,
        categoryId: args.categoryId,
        sizes: {
          createMany: {
            data: args.options.sizes.map((size) => ({
              name: size.name as ProductSizes,
              price: Number(size.price),
            })),
          },
        },
        extras: {
          createMany: {
            data: args.options.extras.map((extra) => ({
              name: extra.name as ExtraIngredients,
              price: Number(extra.price),
            })),
          },
        },
      },
    });
    revalidatePath(`/${locale}/${Routes.MENU}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`);
    revalidatePath(`/${locale}`);
    return {
      status: 201,
      message: translations.messages.menuItemAdded,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "An unexpected error occurred",
    };
  }
};

export const updateProduct = async (
  args: {
    productId: string;
    options: { sizes: Partial<Size>[]; extras: Partial<Extra>[] };
  },
  prevState: unknown,
  formData: FormData,
) => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale, "menuItems");
  const result = updateProductSchema(translations).safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (result.success === false) {
    return {
      error: result.error.flatten().fieldErrors,
      status: 400,
      formData,
    };
  }
  const data = result.data;
  const basePrice = Number(data.basePrice);
  const imageFile = data.image as File;
  const imageUrl = Boolean(imageFile.size)
    ? await getImageUrl(imageFile)
    : undefined;

  const product = await db.product.findUnique({
    where: { id: args.productId },
  });

  if (!product) {
    return {
      status: 400,
      message: "An unexpected error occurred",
    };
  }
  try {
    const updatedProduct = await db.product.update({
      where: {
        id: args.productId,
      },
      data: {
        ...data,
        basePrice,
        image: imageUrl ?? product.image,
      },
    });

    await db.size.deleteMany({
      where: { productId: args.productId },
    });
    await db.size.createMany({
      data: args.options.sizes.map((size) => ({
        productId: args.productId,
        name: size.name as ProductSizes,
        price: Number(size.price),
      })),
    });

    await db.extra.deleteMany({
      where: { productId: args.productId },
    });

    await db.extra.createMany({
      data: args.options.extras.map((extra) => ({
        productId: args.productId,
        name: extra.name as ExtraIngredients,
        price: Number(extra.price),
      })),
    });
    revalidatePath(`/${locale}/${Routes.MENU}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`);
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${updatedProduct.id}/${Pages.EDIT}`,
    );
    revalidatePath(`/${locale}`);
    return {
      status: 200,
      message: translations.messages.updateMenuItemSuccess,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "An unexpected error occurred",
    };
  }
};

export const deleteProduct = async (id: string) => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale, "menuItems");
  try {
    await db.product.delete({
      where: { id },
    });
    revalidatePath(`/${locale}/${Routes.MENU}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`);
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${id}/${Pages.EDIT}`,
    );
    revalidatePath(`/${locale}`);
    return {
      status: 200,
      message: translations.messages.deleteMenuItemSuccess,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "An unexpected error occurred",
    };
  }
};
