import { createContext, ReactNode, useContext, useState } from "react";
import { Productt } from "../types/product";
type ShoppingCartProviderProps = {
  children: ReactNode;
};
type ShoppingCartContext = {
  //   openCart: () => void;
  //   closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (product: Productt) => void;
  decreaseCartQuantity: (product: Productt) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  // cartItems: CartItem[];
  cartItems: Productt[];
  setCartItems: (args: Productt) => void;
};
type CartItem = {
  id: number;
  quantity: number;
};
const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  // const [cartItems, setCartItem] = useState<CartItem[]>([]);
  const [cartItems, setCartItems] = useState<Productt[]>([]);
  //   const [isOpen, setIsopen] = useState(false);
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );
  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }
  // function increaseCartQuantity(id: number) {
  //   setCartItems((currItems: any) => {
  //     if (currItems.find((item: Productt) => item.id === id) == null) {
  //       return [...currItems, { id, quantity: 1 }];
  //     } else {
  //       return currItems.map((item: Productt) => {
  //         if (item.id === id) {
  //           return { ...item, quantity: item.quantity + 1 };
  //         } else {
  //           return item;
  //         }
  //       });
  //     }
  //   });
  // }

  function increaseCartQuantity(product: Productt) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === product.id) == null) {
        return [...currentItems, { ...product, quantity: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  // function decreaseCartQuantity(id: number) {
  //   setCartItems((currItems) => {
  //     if (currItems.find((item) => item.id === id)?.quantity === 1) {
  //       return currItems.filter((item) => item.id !== id);
  //     } else {
  //       return currItems.map((item) => {
  //         if (item.id === id) {
  //           return { ...item, quantity: item.quantity - 1 };
  //         } else {
  //           return item;
  //         }
  //       });
  //     }
  //   });
  // }

  function decreaseCartQuantity(product: Productt) {
    setCartItems((currItems) => {
      const existingProduct = currItems.find((item) => item.id === product.id);

      if (!existingProduct) {
        // product does not exist in cart, do nothing
        return currItems;
      }

      if (existingProduct.quantity === 1) {
        return currItems.filter((item) => item.id !== product.id);
      } else {
        return currItems.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems((curItems) => {
      return curItems.filter((item) => item.id !== id);
    });
  }
  //   const openCart = () => setIsopen(true);
  //   const closeCart = () => setIsopen(false);
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        setCartItems(args) {},
        // openCart,
        // closeCart,
      }}
    >
      {children}
      {/* <ShoppingCart /> */}
    </ShoppingCartContext.Provider>
  );
}
