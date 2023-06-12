import React, { useEffect, useState } from "react";
import { on } from "stream";
import { getProductsList } from "../../services/getProductsList";
import { Productt } from "../../types/product";
import MyInput from "../ui/input/MyInput";
import styles from "./FilterAccordion.module.scss";
type Props = {
  productss: Productt[];
  setProductss: (args: Productt[]) => void;
  onClickCategory: (args: number) => void;
};

const FilterAccordionItems: React.FC<Props> = ({
  productss,
  setProductss,
  onClickCategory,
}) => {
  return (
    <div className={styles.genres_list}>
      <div className={styles.genres_item}>
        <MyInput
          type="checkbox"
          value={1}
          onClick={(e) => onClickCategory(+e.currentTarget.value)}
        />
        <label>Action</label>
      </div>
      <div className={styles.genres_item}>
        <MyInput
          type="checkbox"
          value={2}
          onClick={(e) => onClickCategory(+e.currentTarget.value)}
        />
        <label>First person shooter</label>
      </div>
      <div className={styles.genres_item}>
        <MyInput
          type="checkbox"
          value={3}
          onClick={(e) => onClickCategory(+e.currentTarget.value)}
        />
        <label>Adventure</label>
      </div>
      <div className={styles.genres_item}>
        <MyInput
          type="checkbox"
          value={4}
          onClick={(e) => onClickCategory(+e.currentTarget.value)}
        />
        <label>RPG</label>
      </div>
    </div>
  );
};

export default FilterAccordionItems;
