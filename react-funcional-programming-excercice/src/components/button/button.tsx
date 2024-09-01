import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { Link } from "react-router-dom";
import "./button.css";
import "./button.css";

type ButtonProps = { linkTo?: string } & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({ linkTo, ...otherProps }: ButtonProps) => {
  return !linkTo ? (
    <div>
      <button {...otherProps} className="button-default" />
    </div>
  ) : (
    <Link to={linkTo!}>
      <button {...otherProps} className="button-default" />
    </Link>
  );
};
