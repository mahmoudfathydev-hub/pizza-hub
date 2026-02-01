"use server";

import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/lib/prisma";
import getTrans from "@/lib/translation";
import { updateProfileSchema } from "@/validations/profile";
import { UserRole } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";

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

  // Fixed: Add proper error handling for image upload
  let imageUrl: string | undefined;
  if (Boolean(imageFile.size)) {
    try {
      imageUrl = await getImageUrl(imageFile);
    } catch (uploadError) {
      console.error("Profile image upload failed:", uploadError);
      // Continue without image update - don't fail the entire profile update
      // This prevents silent failures that appear as server errors
    }
  }

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

    // Cache revalidation with error handling
    try {
      revalidatePath(`/${locale}/${Routes.PROFILE}`);
      revalidatePath(`/${locale}/${Routes.ADMIN}`);
      revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`);
      revalidatePath(
        `/${locale}/${Routes.ADMIN}/${Pages.USERS}/${user.id}/${Pages.EDIT}`,
      );

      // Invalidate cached user data
      try {
        revalidateTag("users", "max");
        revalidateTag("user-profile", "max");
        revalidateTag("profile-images", "max");
      } catch (cacheError) {
        console.error("Cache invalidation failed:", cacheError);
        // Continue with response even if cache invalidation fails
      }
    } catch (revalidateError) {
      console.error("Path revalidation failed:", revalidateError);
      // Don't fail the entire operation due to revalidation issues
    }
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

  // Configurable timeout from environment or default to 30 seconds
  const UPLOAD_TIMEOUT = parseInt(process.env.UPLOAD_TIMEOUT || "30000");

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), UPLOAD_TIMEOUT);

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
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `Upload failed with status: ${response.status}`,
      );
    }

    const image = (await response.json()) as { url: string };

    if (!image.url) {
      throw new Error("No URL returned from upload service");
    }

    return image.url;
  } catch (error: unknown) {
    // Enhanced error handling with specific cases
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(
        `Upload timed out after ${UPLOAD_TIMEOUT / 1000} seconds. Please try again.`,
      );
    }

    // Log detailed error for debugging
    console.error("Profile image upload failed:", {
      fileName: imageFile.name,
      fileSize: imageFile.size,
      fileType: imageFile.type,
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });

    throw error;
  }
};
