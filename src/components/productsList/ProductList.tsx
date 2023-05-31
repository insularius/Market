import React from "react";
// import { Product } from "../../types";
import { product } from "../../types/product";
import ProductItem from "../productsItem/ProductItem";
import styles from "./ProductList.module.scss";

// type Props = {
//   products: Product[];
// };
type Props = {
  productss: product[];
};
const ProductList: React.FC<Props> = ({ productss }) => {
  const likeHandler = (item: product) => {
    console.log(`Liked product with id:${item.id}`);
  };

  const sayHello = (item: product) => {
    console.log(
      `This game ${item.attributes.name} genre is: ${item.attributes.description}`
    );
  };

  if (!productss.length) {
    return <h1 style={{ textAlign: "center" }}>Nothing's here. Try again</h1>;
  }

  return (
    <div className={styles.productsList}>
      {productss.map((product) => (
        <ProductItem
          product={product}
          key={product.id}
          onLikeHandler={likeHandler}
          sayHi={sayHello}
        />
      ))}
    </div>
  );
};

export default ProductList;
