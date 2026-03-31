import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (shoe, size) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === shoe.id && item.size === size
      );
      if (existing) {
        return prev.map((item) =>
          item.id === shoe.id && item.size === size
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...shoe, size, qty: 1 }];
    });
  };

  const removeFromCart = (id, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size))
    );
  };

  const updateQty = (id, size, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, qty: item.qty + delta }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const count = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        total,
        count,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);