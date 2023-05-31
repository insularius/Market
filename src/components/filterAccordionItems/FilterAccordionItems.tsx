import React, { useState } from "react";
import MyInput from "../ui/input/MyInput";
import styles from "./FilterAccordion.module.scss";
type Props = {
  onClickCategory: (args: string) => void;
};
const FilterAccordionItems: React.FC<Props> = ({ onClickCategory }) => {
  const [blah, setBlah] = useState([
    {
      id: "1",
      name: "action-adventure",
      genre: "Action-adventure",
    },
    {
      id: "2",
      name: "soulslike",
      genre: "Shooter",
    },
    {
      id: "3",
      name: "horror",
      genre: "Horror",
    },
  ]);
  return (
    <div className={styles.genres_list}>
      {blah.map((item) => (
        <div className={styles.genres_item}>
          <MyInput
            key={item.id}
            type="checkbox"
            name={item.name}
            onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) =>
              onClickCategory(e.currentTarget.name)
            }
          />
          <label htmlFor="action">{item.genre}</label>
        </div>
      ))}
    </div>
  );
};

export default FilterAccordionItems;
