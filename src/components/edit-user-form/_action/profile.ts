"use server";

import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/lib/prisma";
import getTrans from "@/lib/translation";
import { updateProfileSchema } from "@/validations/profile";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateProfile = async (prevState: unknown, formData: FormData) => {
  const isAdmin = formData.get("isAdmin") === "true";
  const locale = await getCurrentLocale();
  const [profileTranslations, authTranslations] = await Promise.all([
    getTrans(locale, "profile"),
    getTrans(locale, "auth"),
  ]);
  const formDataObj = Object.fromEntries(formData.entries()) as Record<
    string,
    string | File
  >;
  // Remove isAdmin from the data before validation
  delete formDataObj.isAdmin;
  const result =
    updateProfileSchema(profileTranslations).safeParse(formDataObj);

  if (result.success === false) {
    return {
      error: result.error.flatten().fieldErrors,
    };
  }
  const data = result.data;
  const imageFile = data.image as File;
  const imageUrl = Boolean(imageFile.size)
    ? await getImageUrl(imageFile)
    : undefined;

  try {
    const user = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      return {
        message: authTranslations.messages.userNotFound || "User not found",
        status: 401,
      };
    }
    await db.user.update({
      where: {
        email: user.email,
      },
      data: {
        ...data,
        image: imageUrl ?? user.image,
        role: isAdmin ? UserRole.ADMIN : UserRole.USER,
      },
    });
    revalidatePath(`/${locale}/${Routes.PROFILE}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`);
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${Pages.USERS}/${user.id}/${Pages.EDIT}`,
    );
    const successResult = {
      status: 200,
      message: profileTranslations.messages.updateProfileSucess,
    };
    return successResult;
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message:
        authTranslations.messages.unexpectedError ||
        "An unexpected error occurred",
    };
  }
};

const getImageUrl = async (imageFile: File) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("pathName", "profile_images");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Upload failed with status: ${response.status}`,
      );
    }

    const image = (await response.json()) as { url: string };
    return image.url;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
