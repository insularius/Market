import React, { useState } from "react";
import { Productt } from "../../types/product";
import Loader from "../loader/Loader";
import ProductItem from "../productsItem/ProductItem";
import styles from "./ProductList.module.scss";

type Props = {
  productss: Productt[];
};

const ProductList: React.FC<Props> = ({ productss }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  if (!productss.length) {
    return (
      <div style={{ marginLeft: "650px" }}>
        <Loader isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
    );
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
