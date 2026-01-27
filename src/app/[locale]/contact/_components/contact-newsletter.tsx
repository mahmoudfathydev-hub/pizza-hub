"use client"

import { Button } from "@/src/components/ui/button"
import { useTranslations } from "@/src/hooks/use-translations"

const ContactNewsletter = () => {
    const { t, loading } = useTranslations('contact')
    
    if (loading) {
        return (
            <section className="container mx-auto section-gap">
                <div className="bg-[#1a1a1a] rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="w-full md:w-1/2">
                        <div className="h-12 bg-gray-700 rounded animate-pulse w-48 mb-4"></div>
                        <div className="h-4 bg-gray-700 rounded animate-pulse w-64"></div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="h-12 bg-gray-700 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </section>
        )
    }
    
    return (
        <section className="container mx-auto section-gap">
            <div
                data-aos="zoom-in"
                className="bg-[#1a1a1a] rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative"
            >
                {/* Background Pattern Hint */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-neutral-800 rounded-full blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>

                <div className="w-full md:w-1/2 z-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        {(t.newsletter?.title || '').split(' ').map((word: string, index: number) => 
                            word === 'Loop' ? 
                                <><br />{word}</> : 
                                <>{word} </>
                        )}
                    </h2>
                    <p className="text-neutral-400 text-lg">
                        {t.newsletter?.description || ''}
                    </p>
                </div>

                <div className="w-full md:w-1/2 flex items-center gap-4 z-10">
                    <div className="flex w-full max-w-md bg-neutral-800 rounded-full p-2 pl-6">
                        <input
                            type="email"
                            placeholder={t.newsletter?.placeholder || ''}
                            className="bg-transparent border-none outline-none text-white w-full placeholder:text-neutral-500"
                        />
                        <Button
                            className="rounded-full px-8 py-6 font-bold text-base hover:bg-primary/90"
                        >
                            {t.newsletter?.submit || ''}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactNewsletter
