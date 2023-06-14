import React, { ReactNode } from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";

import styles from "./Modal.module.scss";
type Props = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (args: boolean) => void;
};

const Modal = ({ children, isOpen, setIsOpen }: Props) => {
  const rootClasses = [styles.modal];

  if (isOpen) {
    rootClasses.push(styles.active);
  }

  const onContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    // event.preventDefault();
  };
  return (
    <div onClick={() => setIsOpen(false)} className={rootClasses.join(" ")}>
      <div onClick={onContentClick} className={styles.modalContent}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
