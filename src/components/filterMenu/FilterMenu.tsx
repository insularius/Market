import React, { useEffect, useState } from "react";
import { data } from "../../mock";
import { SearchState } from "../../pages/productPage/ProductPage";
import { getProductsList } from "../../services/getProductsList";
import { Product } from "../../types";
import { Productt } from "../../types/product";
import FilterAccordion from "../filterAccordion/FilterAccordion";
import FilterAccordionItems from "../filterAccordionItems/FilterAccordionItems";
import FilterSearchInputs from "../filterSearchInputs/FilterSearchInputs";
import MyButton from "../ui/button/MyButton";

import styles from "./FilterMenu.module.scss";
type Props = {
  search: SearchState;
  setSearch: (args: SearchState) => void;
  productss: Productt[];
  setProductss: (args: Productt[]) => void;
};
const FilterMenu: React.FC<Props> = ({
  search,
  setSearch,
  productss,
  setProductss,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryId, setCategoryId] = useState<number[]>([]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  const resetCategories = () => {
    setCategoryId([]);
  };
  const handleReset = () => {
    resetCategories();
    handleToggle();
  };
  const onClickCategory = (v: number) => {
    setCategoryId((s) => {
      if (s.includes(v)) {
        return s.filter((id: number) => id !== v);
      }
      return [...s, v];
    });
  };

  useEffect(() => {
    getProductsList({ categoryId: categoryId }).then((res) =>
      setProductss(res.data)
    );
  }, [categoryId, setProductss]);

  return (
    <div className={styles.filter}>
      <div>
        <FilterSearchInputs setSearch={setSearch} search={search} />
      </div>
      <div>
        <FilterAccordion value="Genre" onHandleToggle={handleToggle} />
        {isOpen && (
          <FilterAccordionItems
            productss={productss}
            setProductss={setProductss}
            onClickCategory={onClickCategory}
          />
        )}
      </div>
      <FilterAccordion value="Price" onHandleToggle={handleToggle} />
      <div className={styles.btnDiv}>
        <MyButton onClick={handleReset}>Reset</MyButton>
      </div>
    </div>
  );
};

export default FilterMenu;
