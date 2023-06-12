import React from "react";

// import { Product } from "../../types";
import { Productt } from "../../types/product";
import ProductItem from "../productsItem/ProductItem";
import styles from "./ProductList.module.scss";

// type Props = {
//   products: Product[];
// };
type Props = {
  productss: Productt[];
};

const ProductList: React.FC<Props> = ({ productss }) => {
  const LikeHandler = (item: Productt) => {
    console.log(`Liked product with id:${item.id}`);
  };

  const sayHello = (item: Productt) => {
    console.log(
      `This game ${item.attributes.name} genre is: ${item.attributes.description}`
    );
  };

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
