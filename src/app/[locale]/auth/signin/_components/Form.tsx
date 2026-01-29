"use client";

import FormFields from "@/src/components/form-fields/form-fields";
import { Button } from "@/src/components/ui/button";
import Loader from "@/src/components/ui/Loader";
import { Pages, Routes } from "@/src/constants/enums";
import { useToast } from "@/src/hooks/use-toast";
import useAuthFormFields from "@/src/hooks/useAuthFormFields";
import { IFormField } from "@/src/types/app";
import { AuthTranslations } from "@/src/types/AuthTranslations";
import { ValidationErrors } from "@/src/validations/auth";
import { signIn, useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";

function Form({ translations }: { translations: AuthTranslations }) {
  const router = useRouter();
  const { locale } = useParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { data: session } = useSession();

  const { getFormField } = useAuthFormFields({
    slug: Pages.LOGIN,
    translations,
  });

  useEffect(() => {
    if (session?.user) {
      // Redirect based on user role
      if (session.user.role === "ADMIN") {
        router.replace(`/${locale}/${Routes.ADMIN}`);
      } else {
        router.replace(`/${locale}/${Routes.PROFILE}`);
      }
    }
  }, [session, locale, router]);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.error) {
        const validationError = JSON.parse(res?.error).validationError;
        setError(validationError);
        const responseError = JSON.parse(res?.error).responseError;
        if (responseError) {
          toast({
            title: responseError,
            variant: "destructive",
            className: "bg-red-50 text-red-700 border border-red-200",
          });
        }
      }
      if (res?.ok) {
        toast({
          title: translations.messages.loginSuccessful,
          variant: "default",
          className: "bg-green-50 text-green-700 border border-green-200",
        });
        // Redirect will be handled by useEffect when session is updated
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={onSubmit} ref={formRef}>
      {getFormField().map((field: IFormField) => (
        <div key={field.name} className="mb-3">
          <FormFields {...field} error={error} />
        </div>
      ))}
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? <Loader /> : translations.login.submit}
      </Button>
    </form>
  );
}

export default Form;
