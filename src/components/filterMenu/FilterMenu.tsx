import React, { useState } from "react";
import { data } from "../../mock";
import { SearchState } from "../../pages/productsPages/ProductPage";
import FilterAccordion from "../filterAccordion/FilterAccordion";
import FilterAccordionItems from "../filterAccordionItems/FilterAccordionItems";
import FilterSearchInputs from "../filterSearchInputs/FilterSearchInputs";
import MyButton from "../ui/button/MyButton";

import styles from "./FilterMenu.module.scss";
type Props = {
  search: SearchState;
  setSearch: (args: SearchState) => void;
  category: string;
  onClickCategory: (args: string) => void;
  // setProducts: any;
};

const FilterMenu: React.FC<Props> = ({
  search,
  setSearch,
  category,
  onClickCategory,
  // setProducts,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  const handleReset = () => {
    // setProducts(data);
    onClickCategory("");
    setIsOpen(false);
  };

  // const handleCategoryClick = (name: string) => {};

  return (
    <div className={styles.filter}>
      <div>
        <FilterSearchInputs setSearch={setSearch} search={search} />
      </div>
      <div>
        <FilterAccordion value="Genre" onHandleToggle={handleToggle} />
        {isOpen && <FilterAccordionItems onClickCategory={onClickCategory} />}
      </div>
      <FilterAccordion value="Price" onHandleToggle={handleToggle} />
      <div className={styles.btnDiv}>
        <MyButton onClick={handleReset}>Reset</MyButton>
      </div>
    </div>
  );
};

export default FilterMenu;
