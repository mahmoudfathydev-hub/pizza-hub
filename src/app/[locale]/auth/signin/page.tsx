import Link from "@/components/link";
import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import Form from "./_components/Form";
import getTrans from "@/lib/translation";
import { aosAnimations } from "@/utils/aos";

async function SigninPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const translations = await getTrans(locale, "auth");
  return (
    <main>
      <div
        className="py-44 md:py-40 bg-gray-50 element-center"
        {...aosAnimations.fadeInUp()}
      >
        <div className="container element-center">
          <div
            className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
            {...aosAnimations.zoomIn()}
          >
            <h2 className="text-2xl font-semibold text-center text-black mb-4">
              {translations.login.title}
            </h2>
            <Form translations={translations} />
            <p className="mt-2 flex items-center justify-center text-accent text-sm">
              <span>{translations.login.authPrompt.message}</span>
              <Link
                href={`/${locale}/${Routes.AUTH}/${Pages.Register}`}
                className={`${buttonVariants({
                  variant: "link",
                  size: "sm",
                })} text-black!`}
              >
                {translations.login.authPrompt.signUpLinkText}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SigninPage;
