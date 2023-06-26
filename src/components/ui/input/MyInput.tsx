import React from "react";
import styles from "./MyInput.module.scss";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const MyInput: React.FC<Props> = ({ className, ...props }) => {
  return (
    <input className={`inp ${className}`} checked={props.checked} {...props} />
  );
};

export default MyInput;
