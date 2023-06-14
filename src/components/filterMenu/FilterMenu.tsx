import React, { useState } from "react";
import { useDebouncedEffect } from "../../hooks/useDebouncedEffect";
import { SearchState } from "../../pages/productPage/ProductPage";
import { getProductsList } from "../../services/getProductsList";
import { Productt } from "../../types/product";
import FilterAccordion from "../filterAccordion/FilterAccordion";
import FilterAccordionItems from "../filterAccordionItems/FilterAccordionItems";
import FilterSearchInputs from "../filterSearchInputs/FilterSearchInputs";
import PriceSlider from "../priceSlider/PriceSlider";
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
  const [isOpenGenre, setIsOpenGenre] = useState(false);
  const [isOpenPrice, setIsOpenPrice] = useState(false);
  const [categoryId, setCategoryId] = useState<number[]>([]);
  const [counter, setCounter] = useState(0);
  const [tempProductss, setTempProductss] = useState<Productt[]>([]);
  // Отложенный список выбранных категорий, обновляется с задержкой после выбора
  // const [debouncedCategoryId, setDebouncedCategoryId] = useState<number[]>([]);
  const handleToggleGenre = () => {
    setIsOpenGenre((prev) => !prev);
  };

  const handleTogglePrice = () => {
    setIsOpenPrice((prev) => !prev);
  };
  const resetCategories = () => {
    setCategoryId([]);
  };

  const handleReset = () => {
    resetCategories();
    getProductsList({}).then((res) => setProductss(res.data));
    setCounter(0);
    handleToggleGenre();
    // handleTogglePrice();
  };

  const handleCounterClick = () => {
    setProductss(tempProductss);
  };

  const onClickCategory = (v: number) => {
    setCategoryId((s) => {
      if (s.includes(v)) {
        return s.filter((id: number) => id !== v);
      }
      return [...s, v];
    });
  };

  // Эффект, который обновляет debouncedCategoryId с задержкой
  // useEffect(() => {
  //   const timerId = setTimeout(() => {
  //     setDebouncedCategoryId(categoryId);
  //   }, 500);

  //   return () => {
  //     clearTimeout(timerId);
  //   };
  // }, [categoryId]);

  // Здесь мы используем пользовательский хук useDebouncedEffect. Он откладывает
  // обновление debouncedCategoryId на 500 миллисекунд, чтобы избежать частых запросов
  // к серверу при выборе категорий.
  // useDebouncedEffect(
  //   () => {
  //     setDebouncedCategoryId(categoryId);
  //   },
  //   500,
  //   [categoryId]
  // );

  // Этот useEffect отслеживает изменения в debouncedCategoryId. Когда debouncedCategoryId
  // изменяется, мы делаем запрос к серверу для получения продуктов по новым категориям.
  // useEffect(() => {
  //   if (debouncedCategoryId.length === 0) {
  //     // Если нет выбранных категорий, мы просто получаем все продукты.
  //     getProductsList({}).then((res) => setProductss(res.data));
  //     setTempProductss([]);
  //     setCounter(0);
  //   } else {
  //     // Если есть выбранные категории, мы делаем запрос к серверу с этими категориями.
  //     getProductsList({ categoryId: debouncedCategoryId }).then((res) => {
  //       setTempProductss(res.data);
  //       setCounter(res.data.length);
  //     });
  //   }
  // }, [debouncedCategoryId, setProductss]);

  // Эффект, который выполняет запрос на основе debouncedCategoryId
  // useEffect(() => {
  //   if (debouncedCategoryId.length === 0) {
  //     getProductsList({}).then((res) => setProductss(res.data));
  //     setTempProductss([]);
  //     setCounter(0);
  //   } else {
  //     getProductsList({ categoryId: debouncedCategoryId }).then((res) => {
  //       setTempProductss(res.data);
  //       setCounter(res.data.length);
  //     });
  //   }
  // }, [debouncedCategoryId, setProductss]);

  // useEffect(() => {
  //   getProductsList({ categoryId: categoryId }).then((res) =>
  //     setProductss(res.data)
  //   );
  // }, [categoryId, setProductss]);

  useDebouncedEffect(
    () => {
      if (categoryId.length === 0) {
        getProductsList({}).then((res) => setProductss(res.data));
        setTempProductss([]);
        setCounter(0);
      } else {
        getProductsList({ categoryId }).then((res) => {
          setTempProductss(res.data);
          setCounter(res.data.length);
        });
      }
    },
    500,
    [categoryId, setProductss]
  );

  return (
    <div className={styles.filter}>
      <div>
        <FilterSearchInputs
          setProductss={setProductss}
          setSearch={setSearch}
          search={search}
        />
      </div>
      <div>
        <FilterAccordion value="Genre" onHandleToggle={handleToggleGenre} />
        {isOpenGenre && (
          <FilterAccordionItems
            productss={productss}
            setProductss={setProductss}
            onClickCategory={onClickCategory}
          />
        )}
      </div>
      <FilterAccordion value="Price" onHandleToggle={handleTogglePrice} />
      {isOpenPrice && (
        <PriceSlider productss={productss} setProductss={setProductss} />
      )}
      <div className={styles.btnDiv}>
        <MyButton onClick={handleReset}>Reset</MyButton>
        <MyButton counter={counter} onClick={handleCounterClick}>
          Show products
        </MyButton>
      </div>
    </div>
  );
};

export default FilterMenu;
