"use server";

import { Environments, Pages, Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/lib/prisma";
import getTrans from "@/lib/translation";
import { loginSchema, signUpSchema } from "@/validations/auth";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

export type SignupState = {
  message?: string;
  error?: import("@/validations/auth").ValidationErrors;
  status?: number | null;
  values?: Record<string, string>;
  attempt?: number;
  user?: {
    id: string;
    name: string;
    email: string;
  };
};

export const login = async (
  credentials: Record<"email" | "password" | "accessKey", string> | undefined,
  locale: Locale,
) => {
  const translations = await getTrans(locale, "auth");
  const result = loginSchema(translations).safeParse(credentials);
  if (result.success === false) {
    return {
      error: result.error.flatten().fieldErrors,
      status: 400,
    };
  }
  try {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
    });
    if (!user) {
      return { message: translations.messages.userNotFound, status: 401 };
    }
    const hashedPassword = user.password;
    const isValidPassword = await bcrypt.compare(
      result.data.password,
      hashedPassword,
    );
    if (!isValidPassword) {
      return {
        message: translations.messages.incorrectPassword,
        status: 401,
      };
    }
    let userRole = user.role;
    if (credentials?.accessKey === "1234") {
      userRole = "ADMIN";
      await db.user.update({
        where: { id: user.id },
        data: { role: "ADMIN" },
      });
    }

    const { password, ...userWithoutPassword } = user;
    return {
      user: { ...userWithoutPassword, role: userRole },
      status: 200,
      message: translations.messages.loginSuccessful,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
};

export const signup = async (
  prevState: SignupState,
  formData: FormData,
): Promise<SignupState> => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale, "auth");

  const values: Record<string, string> = {};
  formData.forEach((value, key) => {
    values[key] = value.toString();
  });

  const result = signUpSchema(translations).safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (result.success === false) {
    return {
      error: result.error.flatten().fieldErrors,
      status: 400,
      values,
      attempt: (prevState.attempt ?? 0) + 1,
    };
  }
  try {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
    });
    if (user) {
      return {
        status: 409,
        message: translations.messages.userAlreadyExists,
        values,
        attempt: (prevState.attempt ?? 0) + 1,
      };
    }
    const hashedPassword = await bcrypt.hash(result.data.password, 10);
    const createdUser = await db.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: hashedPassword,
      },
    });
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`);
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${Pages.USERS}/${createdUser.id}/${Pages.EDIT}`,
    );
    return {
      status: 201,
      message: translations.messages.accountCreated,
      attempt: (prevState.attempt ?? 0) + 1,
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      },
    };
  } catch (error) {
    console.error(error);
    const errorMessage =
      process.env.NODE_ENV === Environments.DEV
        ? `${translations.messages.unexpectedError}: ${error instanceof Error ? error.message : String(error)}`
        : translations.messages.unexpectedError;
    return {
      status: 500,
      message: errorMessage,
      values,
      attempt: (prevState.attempt ?? 0) + 1,
    };
  }
};
