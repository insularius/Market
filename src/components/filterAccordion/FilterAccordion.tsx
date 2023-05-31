import React from "react";
import styles from "./FilterAccordion.module.scss";

type Props = {
  onHandleToggle: () => void;
  value: string;
};

const FilterAccordion: React.FC<Props> = ({ onHandleToggle, value }) => {
  return (
    <div className={styles.genre_dropdown}>
      <h3>{value}</h3>
      <img
        className={styles.star_icon}
        src="./images/icon-bird.png"
        alt=""
        onClick={() => onHandleToggle()}
      />
    </div>
  );
};

export default FilterAccordion;
