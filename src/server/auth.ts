import { Environments, Pages, Routes } from "@/src/constants/enums";
import {  type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/src/lib/prisma";
import { login } from "./_actions/auth";
import { Locale } from "@/src/i18n.config";
import { UserRole } from "@prisma/client";
import { JWT } from "next-auth/jwt";
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            role: UserRole;
            image?: string | null;
            country?: string | null;
            city?: string | null;
            postalCode?: string | null;
            streetAddress?: string | null;
            phone?: string | null;
        };
    }
}
declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        name: string;
        email: string;
        role: UserRole;
        image?: string | null;
        country?: string | null;
        city?: string | null;
        postalCode?: string | null;
        streetAddress?: string | null;
        phone?: string | null;
    }
}
export const authOptions: NextAuthOptions = {
    callbacks: {
        session: ({ session, token }) => {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.role = token.role;
                session.user.image = token.image ?? null;
                session.user.country = token.country ?? null;
                session.user.city = token.city ?? null;
                session.user.postalCode = token.postalCode ?? null;
                session.user.streetAddress = token.streetAddress ?? null;
                session.user.phone = token.phone ?? null;
            }
            return{
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    name: token.name,
                    email: token.email,
                    role: token.role,
                    image: token.image,
                },
            };
        },
        jwt: async ({ token }): Promise<JWT> => {
            if (!token.email) return token;
            const dbUser = await db.user.findUnique({
                where: { email: token.email },
            });
            if (!dbUser) return token;
            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                role: dbUser.role,
                image: dbUser.image,
                country: dbUser.country,
                city: dbUser.city,
                postalCode: dbUser.postalCode,
                streetAddress: dbUser.streetAddress,
                phone: dbUser.phone,
            };
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60, 
        updateAge: 24 * 60 * 60,   
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === Environments.DEV,
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "hello@example.com" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials, req) => {
                const currentUrl = req?.headers?.referer;
                const locale = currentUrl?.split("/")[3] as Locale;
                const res = await login(credentials, locale);
                if (res.status === 200 && res.user) {
                    return res.user;
                } else {
                    throw new Error(
                        JSON.stringify({
                            validationError: res.error,
                            responseError: res.message,
                        })
                    );
                }
            },
        }),
    ],
    adapter: PrismaAdapter(db),
    pages: {
        signIn: `/${Routes.AUTH}/${Pages.LOGIN}`,
    },
};
