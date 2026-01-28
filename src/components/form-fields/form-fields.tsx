import { InputTypes } from "@/src/constants/enums";
import TextField from "./text-field";
import PasswordField from "./password-field";
import { IFormField } from "@/src/types/app";
import Checkbox from "./checkbox";
import { ValidationErrors } from "@/src/validations/auth";

interface Props extends IFormField {
    error: ValidationErrors;
}

const FormFields = (props: Props) => {
    const { type } = props;
    const renderField = (): React.ReactNode => {
        if (type === InputTypes.EMAIL || type === InputTypes.TEXT) {
            return <TextField {...props} />;
        }

        if (type === InputTypes.PASSWORD) {
            return <PasswordField {...props} />;
        }

        if (type === InputTypes.CHECKBOX) {
            return <Checkbox 
                name={props.name}
                label={props.label || ''}
                checked={props.checked || false}
            />;
        }

        return <TextField {...props} />;
    };

    return <>{renderField()}</>;
};

export default FormFields;