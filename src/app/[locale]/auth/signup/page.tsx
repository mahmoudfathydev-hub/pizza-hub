import Link from "@/src/components/link";
import { buttonVariants } from "@/src/components/ui/button";
import { Pages, Routes } from "@/src/constants/enums";
import { Locale } from "@/src/i18n.config";
import getTrans from "@/src/lib/translation";
import Form from "./_components/Form";

async function SignupPage({ params }: { params: Promise<{ locale: Locale }> }) {
    const { locale } = await params;
    const translations = await getTrans(locale, 'auth');
    return (
        <main>
            <div className="py-44 md:py-40 bg-gray-50 element-center">
                <div className="container element-center">
                    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-center text-black mb-4">
                            {translations.register.title}
                        </h2>
                        <Form translations={translations} />
                        <p className="mt-2 flex items-center justify-center text-accent text-sm">
                            <span>{translations.register.authPrompt.message}</span>
                            <Link
                                href={`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`}
                                className={`${buttonVariants({
                                    variant: "link",
                                    size: "sm",
                                })} text-black!`}
                            >
                                {translations.register.authPrompt.loginLinkText}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SignupPage;