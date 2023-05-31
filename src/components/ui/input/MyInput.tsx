import React from "react";
import styles from "./MyInput.module.scss";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const MyInput: React.FC<Props> = ({ ...props }) => {
  return <input className={styles.inp} {...props} />;
};

export default MyInput;
