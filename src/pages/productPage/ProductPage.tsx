import React, { useEffect, useMemo, useState } from "react";
import { Product } from "../../types";
import { data } from "../../mock";
import FilterMenu from "../../components/filterMenu/FilterMenu";
import ProductList from "../../components/productsList/ProductList";
import styles from "./ProductPage.module.scss";
import { Productt } from "../../types/product";
import { getProductsList } from "../../services/getProductsList";
import { getCategoriesList } from "../../services/getCategoriesList";
import { Category } from "../../types/category";
import { useDebouncedEffect } from "../../hooks/useDebouncedEffect";
// export type SearchState = {
//   query?: string;
// };

const ProductPage: React.FC = () => {
  // const [products, setProducts] = useState<Product[]>(data);
  const [productss, setProductss] = useState<Productt[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  // const [product, setProduct] = useState<Productt[]>([]);
  // const [search, setSearch] = useState<SearchState>({
  //   query: "",
  // });
  const [search, setSearch] = useState("");

  // useEffect(() => {
  //   setProductss((prev) =>
  //     prev.filter((item) =>
  //       item.attributes.name
  //         .toLowerCase()
  //         .includes(search?.query?.toLowerCase() || "")
  //     )
  //   );
  // }, [search.query]);

  useEffect(() => {
    getCategoriesList().then((res) => setCategories(res.data));
  }, []);

  // useEffect(() => {
  //   getProductsList({ query: search?.query || "" }).then((res) =>
  //     setProductss(res.data)
  //   );
  //   console.log("вызвана");
  // }, [search.query]);

  // const filteredData = useMemo(() => {
  //   return productss.filter((item) =>
  //     item.attributes.name
  //       .toLowerCase()
  //       .includes(search?.query?.toLowerCase() || "")
  //   );
  // }, [productss, search.query]);

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
          categories={categories}
          setCategories={setCategories}
        />
      </div>

      {/* <ProductList products={products} /> */}
      <div>
        <ProductList productss={productss} />
      </div>
    </div>
  );
};
export default ProductPage;
