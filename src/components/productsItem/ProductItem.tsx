import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { Productt } from "../../types/product";
import Loader from "../loader/Loader";

import MyButton from "../ui/button/MyButton";
import styles from "./ProductItem.module.scss";

type Props = {
  product: Productt;
};

const ProductItem: React.FC<Props> = ({ product }) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(product.id);

  return (
    <div className={styles.item}>
      <img
        src={product.attributes.image?.data?.attributes.url} //product.attributes.image.data.attributes.url
        className={styles.image}
        alt=""
      />
      <div className={styles.info}>
        <small className={styles.article}>
          Article: {product.attributes.article}
        </small>
        <h3 className={styles.title}>{product.attributes.name}</h3>
        <p>{product.attributes.description}</p>
        <p>{product.attributes.price}</p>
      </div>

      <NavLink to={`/store/details/${product.id}`}>
        <MyButton>Details</MyButton>
      </NavLink>
      {!quantity ? (
        <MyButton onClick={() => increaseCartQuantity(product)}>
          + Add to cart
        </MyButton>
      ) : (
        <div className={styles.cart}>
          <div className={styles.cart_items}>
            <MyButton
              style={{ marginLeft: "20px" }}
              onClick={() => decreaseCartQuantity(product)}
            >
              -
            </MyButton>
            <div>
              <span>{quantity} in cart</span>
            </div>
            <MyButton
              style={{ marginRight: "20px" }}
              onClick={() => increaseCartQuantity(product)}
            >
              +
            </MyButton>
          </div>
        </div>
      )}
      {quantity ? (
        <div>
          <MyButton onClick={() => removeFromCart(product.id)}>Remove</MyButton>
        </div>
      ) : null}

      <NavLink
        to={`/store/category/${product.attributes.daru_category?.attributes?.name}`}
      ></NavLink>
    </div>
  );
};

export default ProductItem;
//product.attributes.daru_category.data.attributes.name
