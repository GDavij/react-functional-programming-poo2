import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import "./form-input.css";
import { formatLabelName } from "../../utils/text-formater";

type FormInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const FormInput = ({
  name = "",
  value = "",
  ...otherProps
}: FormInputProps) => {
  return (
    <label htmlFor={name ?? ""} className="form-input-wrapper">
      {name && (
        <span className="input-description">
          {name && formatLabelName(name)}
        </span>
      )}
      <input id={name ?? ""} value={value} {...otherProps} className="input" />
    </label>
  );
};
