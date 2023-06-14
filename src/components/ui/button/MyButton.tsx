import React, { MouseEventHandler, PropsWithChildren } from "react";

import styles from "./MyButton.module.scss";

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  style?: any;
  className?: string;
  counter?: number;
};

const MyBtn: React.FC<PropsWithChildren<Props>> = ({
  children,
  counter,
  ...props
}) => {
  const count = counter ?? 0;
  return (
    <button {...props} className={`${styles.btn} ${props.className}`}>
      {children}
      {count > 0 && <span className={styles.counter}>{counter}</span>}
    </button>
  );
};

export default MyBtn;
