type Field = {
    label: string;
    placeholder: string;
};

export type AuthTranslations = {
    login: {
        title: string;
        name: Field;
        email: Field;
        password: Field;
        submit: string;
        authPrompt: {
            message: string;
            signUpLinkText: string;
        };
    };
    register: {
        title: string;
        name: Field;
        email: Field;
        password: Field;
        confirmPassword: Field;
        submit: string;
        authPrompt: {
            message: string;
            loginLinkText: string;
        };
    };
    validation: {
        nameRequired: string;
        validEmail: string;
        passwordMinLength: string;
        passwordMaxLength: string;
        confirmPasswordRequired: string;
        passwordMismatch: string;
    };
    messages: {
        userNotFound: string;
        incorrectPassword: string;
        loginSuccessful: string;
        unexpectedError: string;
        userAlreadyExists: string;
        accountCreated: string;
    };
};
