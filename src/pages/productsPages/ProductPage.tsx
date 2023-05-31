import React, { useEffect, useMemo, useState } from "react";
import { Product } from "../../types";
import { data } from "../../mock";
import FilterMenu from "../../components/filterMenu/FilterMenu";
import ProductList from "../../components/productsList/ProductList";
import styles from "./ProductPage.module.scss";
import { getProductList } from "../../services/getProductList";
import { product } from "../../types/product";

export type SearchState = {
  query?: string;
  description?: string;
};

const ProductPage: React.FC = () => {
  // const [products, setProducts] = useState<Product[]>(data);
  const [productss, setProductss] = useState<product[]>([]);
  const [category, setCategory] = useState<string>("");
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

  const onClickCategory = (v: string) => {
    setCategory(v);
  };

  useEffect(() => {
    console.log(productss);
  }, []);

  useEffect(() => {
    getProductList().then((res) => setProductss(res.data));
  }, []);

  // useEffect(() => {
  //   const dataa: product = {
  //     id: 2,
  //     attributes: {
  //       name: "string",
  //       description: "string",
  //       article: "string",
  //       price: 4444,
  //       updatedAt: "sdsds",
  //       createdAt: "sdsdsd",
  //       publishedAt: "dsdsd",
  //     },
  //   };
  //   axios
  //     .post("https://dario-cms.dar-dev.zone/api/daru-products", dataa)
  //     .then((res) => {
  //       setProductss(res.data);
  //     });
  // });

  const filteredData = useMemo(() => {
    return productss.filter((item) =>
      item.attributes.name
        .toLowerCase()
        .includes(search?.query?.toLowerCase() || "")
    );
  }, [productss, search.query]);

  const filrd = useMemo(() => {
    return productss.filter((item) =>
      item.attributes.description
        .toLowerCase()
        .includes(search?.description?.toLowerCase() || "")
    );
  }, [productss, search.description]);

  // useEffect(() => {
  //   console.log(search?.query);
  // }, [search?.query]);

  return (
    <div className={styles.App}>
      <FilterMenu
        search={search}
        setSearch={setSearch}
        category={category}
        onClickCategory={(name: string) => onClickCategory(name)}
        // setProducts={setProducts}
      />
      {/* <ProductList products={products} /> */}
      <ProductList productss={filteredData} />
    </div>
  );
};
export default ProductPage;
