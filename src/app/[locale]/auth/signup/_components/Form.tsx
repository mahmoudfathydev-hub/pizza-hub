"use client";

import FormFields from "@/src/components/form-fields/form-fields";
import { Button } from "@/src/components/ui/button";
import Loader from "@/src/components/ui/Loader";
import { Pages, Routes } from "@/src/constants/enums";
import { toast } from "@/src/hooks/use-toast";
import useAuthFormFields from "@/src/hooks/useAuthFormFields";
import { signup, type SignupState } from "@/src/server/_actions/auth";
import { IFormField } from "@/src/types/app";
import { AuthTranslations } from "@/src/types/AuthTranslations";
import { useParams, useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

const initialState: SignupState = {
  message: "",
  error: {},
};

function Form({ translations }: { translations: AuthTranslations }) {
  const { locale } = useParams();
  const router = useRouter();
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
      toast({
        title: state.message,
        className: state.status === 201 ? "text-green-400" : "text-destructive",
      });
    }
    if (state.status === 201) {
      router.replace(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
    }
  }, [locale, router, state.message, state.status]);
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
