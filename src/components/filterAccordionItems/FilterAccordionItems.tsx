import React from "react";
import { Category } from "../../types/category";
import { Productt } from "../../types/product";
import MyInput from "../ui/input/MyInput";
import styles from "./FilterAccordion.module.scss";
type Props = {
  productss: Productt[];
  setProductss: (args: Productt[]) => void;
  categories: Category[];
  onClickCategory: (categoryId: number) => void;
  selectedCategories: number[];
};

const FilterAccordionItems: React.FC<Props> = ({
  productss,
  setProductss,
  onClickCategory,
  categories,
  selectedCategories,
}) => {
  // return (
  //   <div className={styles.genres_list}>
  //     <div className={styles.genres_item}>
  //       <MyInput
  //         type="checkbox"
  //         value={1}
  //         onClick={(e) => onClickCategory(Number(e.currentTarget.value))}
  //       />
  //       <label>Action</label>
  //     </div>
  //     <div className={styles.genres_item}>
  //       <MyInput
  //         type="checkbox"
  //         value={2}
  //         onClick={(e) => onClickCategory(Number(e.currentTarget.value))}
  //       />
  //       <label>First person shooter</label>
  //     </div>
  //     <div className={styles.genres_item}>
  //       <MyInput
  //         type="checkbox"
  //         value={3}
  //         onClick={(e) => onClickCategory(Number(e.currentTarget.value))}
  //       />
  //       <label>Adventure</label>
  //     </div>
  //     <div className={styles.genres_item}>
  //       <MyInput
  //         type="checkbox"
  //         value={4}
  //         onClick={(e) => onClickCategory(Number(e.currentTarget.value))}
  //       />
  //       <label>RPG</label>
  //     </div>
  //   </div>
  // );
  return (
    <div className={styles.genres_list}>
      {categories.map((category) => (
        <div className={styles.genres_item} key={category.id}>
          <MyInput
            type="checkbox"
            value={category.id}
            checked={selectedCategories.includes(category.id)}
            onChange={() => onClickCategory(category.id)}
          />
          <label>{category.attributes.name}</label>
        </div>
      ))}
    </div>
  );
};

export default FilterAccordionItems;
