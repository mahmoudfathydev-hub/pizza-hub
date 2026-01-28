"use client"

import { useParams } from "next/navigation"
import { useMemo, useState, useEffect } from "react"
import getTrans from "@/src/lib/translation"

type PageType = 'home' | 'about' | 'cart' | 'contact' | 'menu' | 'navbar' | 'footer' | 'auth'

export const useTranslations = <T extends PageType>(page: T) => {
    const params = useParams()
    const locale = (params.locale as string) || 'en'
    const [translations, setTranslations] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadTranslations = async () => {
            try {
                const trans = await getTrans(locale as any, page)
                setTranslations(trans)
            } catch (error) {
                console.error(`Failed to load translations for ${String(page)} in ${locale}:`, error)
                setTranslations(null)
            } finally {
                setLoading(false)
            }
        }

        loadTranslations()
    }, [locale, page])

    return { translations, loading }
}
