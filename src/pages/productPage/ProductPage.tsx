import React, { useEffect, useMemo, useState } from "react";
import { Product } from "../../types";
import { data } from "../../mock";
import FilterMenu from "../../components/filterMenu/FilterMenu";
import ProductList from "../../components/productsList/ProductList";
import styles from "./ProductPage.module.scss";
import { Productt } from "../../types/product";
import { getProductsList } from "../../services/getProductsList";
export type SearchState = {
  query?: string;
  description?: string;
};

const ProductPage: React.FC = () => {
  // const [products, setProducts] = useState<Product[]>(data);
  const [productss, setProductss] = useState<Productt[]>([]);
  // const [product, setProduct] = useState<Productt[]>([]);

  const [search, setSearch] = useState<SearchState>({
    query: "",
    description: "",
  });

  // useEffect(() => {
  //   setProductss((prev) =>
  //     prev.filter((item) =>
  //       item.attributes.name
  //         .toLowerCase()
  //         .includes(search?.query?.toLowerCase() || "")
  //     )
  //   );
  // }, [search.query]);

  // useEffect(() => {
  //   setProducts((prev) =>
  //     data.filter((item) =>
  //       item.description
  //         .toLowerCase()
  //         .includes(search?.description?.toLowerCase() || "")
  //     )
  //   );
  // }, [search.description]);

  // useEffect(() => {
  //   setProducts((prev) =>
  //     data.filter((item) =>
  //       item.description.toLocaleLowerCase().includes(category)
  //     )
  //   );
  // }, [category]);

  //можно попробовать по онклику передавать
  // const onCategoryChange = (v: number) => {
  //   getProductCategory(v).then((res) => setProductss(res.data));
  // };

  //получение всех продуктов
  // useEffect(() => {
  //   getProductList().then((res) => setProductss(res.data));
  // }, []);

  //изменённое получение продуктов с категориями (пустой объект передаём, так как в аргументах инпойнта принимаются объё)
  useEffect(() => {
    getProductsList({}).then((res) => setProductss(res.data));
  }, []);

  const filteredData = useMemo(() => {
    return productss.filter((item) =>
      item.attributes.name
        .toLowerCase()
        .includes(search?.query?.toLowerCase() || "")
    );
  }, [productss, search.query]);

  // const filteredData = useMemo(() => {
  //   return productss.filter((item) =>
  //     item.attributes.daru_category.data.attributes.name
  //       .toLowerCase()
  //       .includes(category.toLowerCase())
  //   );
  // }, [productss, category]);

  return (
    <div className={styles.App}>
      <div>
        <FilterMenu
          search={search}
          setSearch={setSearch}
          productss={productss}
          setProductss={setProductss}
          // setProducts={setProducts}
        />
      </div>

      {/* <ProductList products={products} /> */}
      <div>
        <ProductList productss={filteredData} />
      </div>
    </div>
  );
};
export default ProductPage;
