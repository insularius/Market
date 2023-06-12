import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { getProductItem } from "../../services/getProductItemById";
import { getProductsList } from "../../services/getProductsList";
import { Productt } from "../../types/product";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState<Productt[]>([]);
  // useEffect(() => {
  //   getProductsList({}).then((res) => setCartItems(res.data));
  // });
  const id = cartItems.findIndex((i) => i.id === 1);
  useEffect(() => {
    if (!id) return;
    getProductItem(Number(id)).then((res) => setCartItems(res.data));
  }, [id]);

  return (
    <div>
      {cartItems.map((item) => (
        <p>
          {item.id} {item.attributes.name}
        </p>
      ))}
    </div>
  );
};

export default ShoppingCart;
