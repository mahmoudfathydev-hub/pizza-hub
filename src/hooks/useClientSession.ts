"use client";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

export const useClientSession = (initialSession: Session | null) => {
    const { data: session, status } = useSession();

    const currentSession = session ?? initialSession;

    return { data: currentSession, status };
};
