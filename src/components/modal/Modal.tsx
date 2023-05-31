import React from "react";
import styles from "./Modal.module.scss";
const Modal = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}></div>
    </div>
  );
};

export default Modal;
