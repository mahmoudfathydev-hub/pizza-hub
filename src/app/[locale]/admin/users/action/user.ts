"use server";

import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { UserRole } from "@prisma/client";

export const deleteUser = async (id: string) => {
  const session = await getServerSession(authOptions);

  // Authorization check: Only admins can delete users
  if (!session?.user || session.user.role !== UserRole.ADMIN) {
    return {
      status: 403,
      message: "Access denied. Admin privileges required.",
    };
  }

  // Prevent admin from deleting themselves
  if (session.user.id === id) {
    return {
      status: 400,
      message: "Cannot delete your own account.",
    };
  }

  const locale = await getCurrentLocale();

  try {
    // Check if user exists
    const userToDelete = await db.user.findUnique({
      where: { id },
    });

    if (!userToDelete) {
      return {
        status: 404,
        message: "User not found.",
      };
    }

    // Prevent deletion of other admins
    if (userToDelete.role === UserRole.ADMIN) {
      return {
        status: 403,
        message: "Cannot delete admin users.",
      };
    }

    await db.user.delete({
      where: { id },
    });

    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`);
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${Pages.USERS}/${id}/${Pages.EDIT}`,
    );

    return {
      status: 200,
      message: "User deleted successfully.",
    };
  } catch (error) {
    console.error("Delete user error:", error);
    return {
      status: 500,
      message: "An unexpected error occurred.",
    };
  }
};
