import React from "react";
import { Productt } from "../../types/product";
import ProductItem from "../productsItem/ProductItem";
import styles from "./ProductList.module.scss";

type Props = {
  productss: Productt[];
};

const ProductList: React.FC<Props> = ({ productss }) => {
  if (!productss.length) {
    return <h1>Nothing's here</h1>;
  }

  return (
    <div className={styles.productsList}>
      {productss.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;
