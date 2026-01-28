import { Pages } from "../constants/enums";
import { IFormField, IFormFieldsVariables } from "../types/app";
import { AuthTranslations } from "../types/AuthTranslations";

interface Props extends IFormFieldsVariables {
    translations: AuthTranslations;
}

const useAuthFormFields = ({ slug, translations }: Props) => {
    const loginFields = (): IFormField[] => [
        {
            label: translations.login.email.label,
            name: "email",
            type: "email",
            placeholder: translations.login.email.placeholder,
            autoFocus: true,
        },
        {
            label: translations.login.password.label,
            name: "password",
            placeholder: translations.login.password.placeholder,
            type: "password",
        },
    ];

    const signupFields = (): IFormField[] => [
        {
            label: translations.register.name.label,
            name: "name",
            type: "text",
            placeholder: translations.register.name.placeholder,
            autoFocus: true,
        },
        {
            label: translations.register.email.label,
            name: "email",
            type: "email",
            placeholder: translations.register.email.placeholder,
        },
        {
            label: translations.register.password.label,
            name: "password",
            type: "password",
            placeholder: translations.register.password.placeholder,
        },
        {
            label: translations.register.confirmPassword.label,
            name: "confirmPassword",
            type: "password",
            placeholder: translations.register.confirmPassword.placeholder,
        },
    ];

    const getFormField = (): IFormField[] => {
        switch (slug) {
            case Pages.LOGIN:
                return loginFields();
            case Pages.Register:
                return signupFields();
            default:
                return [];
        }
    };

    return {
        getFormField,
    };
};

export default useAuthFormFields;
