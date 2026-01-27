"use client"

import { useParams } from "next/navigation"
import { useMemo, useState, useEffect } from "react"
import getTrans from "@/src/lib/translation"

type PageType = 'home' | 'about' | 'cart' | 'contact' | 'menu' | 'navbar' | 'footer'

interface TranslationResponse {
    [key: string]: any
}

export const useTranslations = (page: PageType) => {
    const params = useParams()
    const locale = (params.locale as string) || 'en'
    const [translations, setTranslations] = useState<TranslationResponse>({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadTranslations = async () => {
            try {
                const trans = await getTrans(locale as any, page)
                setTranslations(trans)
            } catch (error) {
                console.error(`Failed to load translations for ${page} in ${locale}:`, error)
                setTranslations({})
            } finally {
                setLoading(false)
            }
        }

        loadTranslations()
    }, [locale, page])

    const t = useMemo(() => {
        return new Proxy({}, {
            get(target, prop) {
                const key = prop.toString()
                return translations[key] || key
            }
        }) as TranslationResponse
    }, [translations])

    return { t, loading }
}
