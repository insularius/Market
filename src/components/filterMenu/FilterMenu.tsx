import React, { useState } from "react";
import { useDebouncedEffect } from "../../hooks/useDebouncedEffect";
import { getProductsList } from "../../services/getProductsList";
import { Category } from "../../types/category";
import { Productt } from "../../types/product";
import CreateProductForm from "../createProduct/CreateProductFrom";
import EditProduct from "../editProduct/EditProduct";
import FilterAccordion from "../filterAccordion/FilterAccordion";
import FilterAccordionItems from "../filterAccordionItems/FilterAccordionItems";
import FilterSearchInputs from "../filterSearchInputs/FilterSearchInputs";
import PriceSlider from "../priceSlider/PriceSlider";
import MyButton from "../ui/button/MyButton";

import styles from "./FilterMenu.module.scss";

type Props = {
  search: string;
  setSearch: (args: string) => void;
  productss: Productt[];
  setProductss: (args: Productt[]) => void;
  categories: Category[];
  setCategories: (args: Category[]) => void;
};
const FilterMenu: React.FC<Props> = ({
  search,
  setSearch,
  productss,
  setProductss,
  categories,
  setCategories,
}) => {
  const [isOpenGenre, setIsOpenGenre] = useState(false);
  const [isOpenPrice, setIsOpenPrice] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]); //постараться избавиться и использовать стейт продуктпейдж
  const [counter, setCounter] = useState(0);
  const [tempProductss, setTempProductss] = useState<Productt[]>([]);
  const handleToggleGenre = () => {
    setIsOpenGenre((prev) => !prev);
  };

  const handleTogglePrice = () => {
    setIsOpenPrice((prev) => !prev);
  };

  const resetCategories = () => {
    setSelectedCategories([]);
  };

  const handleReset = () => {
    resetCategories();
    setSearch("");
    getProductsList({}).then((res) => setProductss(res.data));
    setCounter(0);
  };

  const handleCounterClick = () => {
    setProductss(tempProductss);
  };

  // const onClickCategory = (v: number) => {
  //   setCategoryId((s) => {
  //     if (s.includes(v)) {
  //       return s.filter((id: number) => id !== v);
  //     }
  //     return [...s, v];
  //   });
  // };

  const onClickCategory = (categoryId: number) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
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
      if (selectedCategories.length === 0) {
        getProductsList({}).then((res) => setProductss(res.data));
        setTempProductss([]);
        setCounter(0);
      } else {
        getProductsList({ categoryId: selectedCategories }).then((res) => {
          setTempProductss(res.data);
          setCounter(res.data.length);
        });
      }
    },
    1500,
    [selectedCategories, setProductss]
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
            // onClickCategory={onClickCategory}
            categories={categories}
            onClickCategory={onClickCategory}
            selectedCategories={selectedCategories}
          />
        )}
      </div>
      <FilterAccordion value="Price" onHandleToggle={handleTogglePrice} />
      {isOpenPrice && (
        <PriceSlider productss={productss} setProductss={setProductss} />
      )}
      {/* <div>Create product</div>
      <br />
      <CreateProductForm
        categories={categories}
        setCategories={setCategories}
      />
      <br />
      <div>Update form</div>
      <br />
      <EditProduct productss={productss} setProductss={setProductss} /> */}
      <div className={styles.btnDiv}>
        <MyButton onClick={handleReset}>Reset</MyButton>
        <MyButton counter={counter} onClick={handleCounterClick}>
          Show products
        </MyButton>
        {/* {category.map((item) => (
          <div>{item.attributes.daru_category.data.id}</div>
        ))} */}
      </div>
    </div>
  );
};

export default FilterMenu;
