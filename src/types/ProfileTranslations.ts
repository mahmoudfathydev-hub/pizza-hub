type Field = {
    label: string;
    placeholder: string;
    validation?: {
        required: string;
        invalid?: string;
    };
};

export type ProfileTranslations = {
    title: string;
    save: string;
    form: {
        name: Field;
        email: Field;
        phone: Field;
        address: Field;
        postalCode: Field;
        city: Field;
        country: Field;
    };
};
