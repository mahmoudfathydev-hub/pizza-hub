import { IFormField } from "@/types/app";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ValidationErrors } from "@/validations/auth";
import { useEffect, useState } from "react";

interface Props extends IFormField {
  error: ValidationErrors;
}

const TextField = ({
  label,
  name,
  type,
  placeholder,
  disabled,
  autoFocus,
  error,
  defaultValue,
  readOnly,
}: Props) => {
  const [value, setValue] = useState(defaultValue || "");
  const hasError = error && error[name];

  useEffect(() => {
    if (defaultValue !== undefined) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="capitalize text-black mb-2">
        {label}
      </Label>
      <Input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        readOnly={readOnly}
        className={hasError ? "border-red-500 focus:border-red-500" : ""}
      />
      {hasError && (
        <p className="text-red-600 mt-2 text-sm font-medium">{hasError}</p>
      )}
    </div>
  );
};

export default TextField;
