import React from "react";
// import { Product } from "../../types";
import { product } from "../../types/product";
import MyButton from "../ui/button/MyButton";
import styles from "./ProductItem.module.scss";
// type Props = {
//   product: Product;
//   onLikeHandler: (item: Product) => void;
//   sayHi: (item: Product) => void;
// };
type Props = {
  product: product;
  onLikeHandler: (item: product) => void;
  sayHi: (item: product) => void;
};

const ProductItem: React.FC<Props> = ({ product, onLikeHandler, sayHi }) => {
  return (
    <div className={styles.item}>
      {/* <img src={product.image} className={styles.image} alt="" /> */}
      <div className={styles.info}>
        <small className={styles.article}>Article: {product.id}</small>
        <h3 className={styles.title}>{product.attributes.name}</h3>
        <p>{product.attributes.description}</p>
        <p>{product.attributes.price}</p>
      </div>
      <MyButton onClick={() => onLikeHandler(product)}>Like!</MyButton>
      <MyButton onClick={() => sayHi(product)}>Buy</MyButton>
    </div>
  );
};

export default ProductItem;
