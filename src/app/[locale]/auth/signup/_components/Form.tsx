"use client";

import FormFields from "@/components/form-fields/form-fields";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import { Pages, Routes } from "@/constants/enums";
import { useToast } from "@/hooks/use-toast";
import useAuthFormFields from "@/hooks/useAuthFormFields";
import { signup, type SignupState } from "@/server/_actions/auth";
import { IFormField } from "@/types/app";
import { AuthTranslations } from "@/types/AuthTranslations";
import { useParams, useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

const initialState: SignupState = {
  message: "",
  error: {},
};

function Form({ translations }: { translations: AuthTranslations }) {
  const { locale } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [state, action, pending] = useActionState<SignupState, FormData>(
    signup,
    initialState,
  );
  const { getFormField } = useAuthFormFields({
    slug: Pages.Register,
    translations,
  });

  useEffect(() => {
    if (state.status && state.message) {
      if (state.status === 201) {
        toast({
          title: state.message,
          variant: "default",
          className: "bg-green-50 text-green-700 border border-green-200",
        });
        // Redirect to profile page after successful signup
        setTimeout(() => {
          router.replace(`/${locale}/${Routes.PROFILE}`);
        }, 1500);
        // Reset form after successful signup
        const form = document.querySelector("form");
        if (form) form.reset();
      } else {
        toast({
          title: state.message,
          variant: "destructive",
          className: "bg-red-50 text-red-700 border border-red-200",
        });
      }
    }
  }, [state.message, state.status, locale, router]);
  return (
    <form action={action}>
      {getFormField().map((field: IFormField) => {
        const fieldValue = state.values?.[field.name];
        return (
          <div key={field.name} className="mb-3">
            <FormFields
              {...field}
              error={state.error}
              defaultValue={fieldValue}
            />
          </div>
        );
      })}
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? <Loader /> : translations.register.submit}
      </Button>
    </form>
  );
}

export default Form;
