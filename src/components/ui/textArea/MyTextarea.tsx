import React from "react";
import styles from "./MyTextarea.module.scss";

type Props = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

const MyTextarea: React.FC<Props> = ({ ...props }) => {
  return <textarea className={styles.textArea} {...props} />;
};

export default MyTextarea;
