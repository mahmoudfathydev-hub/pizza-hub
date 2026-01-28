import { Pages } from "../constants/enums";
import { IFormField, IFormFieldsVariables } from "../types/app";
import { Translations } from "../types/Translations";

interface Props extends IFormFieldsVariables {
    translations: Translations;
}
const useFormFields = ({ slug, translations }: Props) => {
    const loginFields = (): IFormField[] => [
        {
            label: translations.auth.login.email.label,
            name: "email",
            type: "email",
            placeholder: translations.auth.login.email.placeholder,
            autoFocus: true,
        },
        {
            label: translations.auth.login.password.label,
            name: "Password",
            type: "password",
            placeholder: translations.auth.login.password.placeholder,
        }
    ];
    const registerFields = (): IFormField[] => [
        {
            label: translations.auth.register.name.label,
            name: "name",
            type: "text",
            placeholder: translations.auth.register.name.placeholder,
            autoFocus: true,
        },
        {
            label: translations.auth.register.email.label,
            name: "email",
            type: "email",
            placeholder: translations.auth.register.email.placeholder,
        },
        {
            label: translations.auth.register.password.label,
            name: "password",
            type: "password",
            placeholder: translations.auth.register.password.placeholder,
        },
        {
            label: translations.auth.register.confirmPassword.label,
            name: "confirmPassword",
            type: "password",
            placeholder: translations.auth.register.confirmPassword.placeholder,
        }
    ];
    const getFormField = (): IFormField[] => {
        switch (slug) {
            case Pages.LOGIN:
                return loginFields();
            case Pages.Register:
                return registerFields();
            default:
                return []
        }
    };
    return {
        getFormField,
    }
}

export default useFormFields;