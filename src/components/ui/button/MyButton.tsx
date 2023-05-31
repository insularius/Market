import React, { MouseEventHandler, PropsWithChildren } from "react";

import styles from "./MyButton.module.scss";

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  style?: any;
};

const MyBtn: React.FC<PropsWithChildren<Props>> = ({ children, ...props }) => {
  return (
    <button {...props} className={styles.btn}>
      {children}
    </button>
  );
};

export default MyBtn;
