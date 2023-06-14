import { useShoppingCart } from "../../context/ShoppingCartContext";
import MyButton from "../ui/button/MyButton";
import styles from "../shoppingCart/ShoppingCart.module.scss";
const ShoppingCart = () => {
  const {
    cartItems,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  return (
    <div className={styles.cartContent}>
      {cartItems.map((item) => (
        <div key={item.id} className={styles.cartItem}>
          <img
            src={item.attributes.image.data.attributes.url}
            alt=""
            className={styles.cartItemImage}
          />
          <div className={styles.cartItemTitle}>
            <p>{item.attributes.name}</p>
            <strong>
              <span>
                Quantity: <span>{item.quantity}</span>
              </span>
            </strong>
          </div>
          <div className={styles.cartItemButtons}>
            <MyButton
              className={styles.cartItemButton}
              onClick={() => increaseCartQuantity(item)}
            >
              +
            </MyButton>
            <MyButton
              className={styles.cartItemButton}
              onClick={() => decreaseCartQuantity(item)}
            >
              -
            </MyButton>
            <MyButton
              className={styles.cartItemRemoveButton}
              onClick={() => removeFromCart(item.id)}
            >
              Remove from Cart
            </MyButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShoppingCart;
