import { Pages, Routes } from "../constants/enums";
import { IFormField, IFormFieldsVariables } from "../types/app";
import { Translations } from "../types/Translations";
import { ProfileTranslations } from "../types/ProfileTranslations";

interface Props extends IFormFieldsVariables {
    translations: Translations | ProfileTranslations;
}
const useFormFields = ({ slug, translations }: Props) => {
    const loginFields = (): IFormField[] => [
        {
            label: (translations as Translations).auth.login.email.label,
            name: "email",
            type: "email",
            placeholder: (translations as Translations).auth.login.email.placeholder,
            autoFocus: true,
        },
        {
            label: (translations as Translations).auth.login.password.label,
            name: "password",
            placeholder: (translations as Translations).auth.login.password.placeholder,
            type: "password",
        },
    ];
    const signupFields = (): IFormField[] => [
        {
            label: (translations as Translations).auth.register.name.label,
            name: "name",
            type: "text",
            placeholder: (translations as Translations).auth.register.name.placeholder,
            autoFocus: true,
        },
        {
            label: (translations as Translations).auth.register.email.label,
            name: "email",
            type: "email",
            placeholder: (translations as Translations).auth.register.email.placeholder,
        },
        {
            label: (translations as Translations).auth.register.password.label,
            name: "password",
            type: "password",
            placeholder: (translations as Translations).auth.register.password.placeholder,
        },
        {
            label: (translations as Translations).auth.register.confirmPassword.label,
            name: "confirmPassword",
            type: "password",
            placeholder: (translations as Translations).auth.register.confirmPassword.placeholder,
        },
    ];

    const profileFields = (): IFormField[] => [
        {
            label: (translations as ProfileTranslations).form.name.label,
            name: "name",
            type: "text",
            placeholder: (translations as ProfileTranslations).form.name.placeholder,
            autoFocus: true,
        },
        {
            label: (translations as ProfileTranslations).form.email.label,
            name: "email",
            type: "email",
            placeholder: (translations as ProfileTranslations).form.email.placeholder,
        },
        {
            label: (translations as ProfileTranslations).form.phone.label,
            name: "phone",
            type: "text",
            placeholder: (translations as ProfileTranslations).form.phone.placeholder,
        },
        {
            label: (translations as ProfileTranslations).form.address.label,
            name: "streetAddress",
            type: "text",
            placeholder: (translations as ProfileTranslations).form.address.placeholder,
        },
        {
            label: (translations as ProfileTranslations).form.postalCode.label,
            name: "postalCode",
            type: "text",
            placeholder: (translations as ProfileTranslations).form.postalCode.placeholder,
        },
        {
            label: (translations as ProfileTranslations).form.city.label,
            name: "city",
            type: "text",
            placeholder: (translations as ProfileTranslations).form.city.placeholder,
        },
        {
            label: (translations as ProfileTranslations).form.country.label,
            name: "country",
            type: "text",
            placeholder: (translations as ProfileTranslations).form.country.placeholder,
        },
    ];

    const addProductFields = (): IFormField[] => [
        {
            label: (translations as Translations).admin["menu-items"].form.name.label,
            name: "name",
            type: "text",
            placeholder: (translations as Translations).admin["menu-items"].form.name.placeholder,
            autoFocus: true,
        },
        {
            label: (translations as Translations).admin["menu-items"].form.description.label,
            name: "description",
            type: "text",
            placeholder:
                (translations as Translations).admin["menu-items"].form.description.placeholder,
        },
        {
            label: (translations as Translations).admin["menu-items"].form.basePrice.label,
            name: "basePrice",
            type: "text",
            placeholder: (translations as Translations).admin["menu-items"].form.basePrice.placeholder,
        },
    ];
    const getFormFields = (): IFormField[] => {
        switch (slug) {
            case Pages.LOGIN:
                return loginFields();
            case Pages.Register:
                return signupFields();
            case Routes.PROFILE:
                return profileFields();
            case `${Routes.ADMIN}/${Pages.MENU_ITEMS}`:
                return addProductFields();
            default:
                return [];
        }
    };
    return {
        getFormFields,
    };
};

export default useFormFields;