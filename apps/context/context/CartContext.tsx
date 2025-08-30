'use client';

import { createContext, useContext, useState, ReactNode } from 'react'

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: { id: number; title: string; price: number }) => void;
  updateQuantity: (id: number, change: number) => void;
  cartCount: number;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType>({
    cartItems: [],
  addToCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartCount: 0,
})

export function CartContextProvider ({ children}: {children: ReactNode} ) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (item: { id: number; title: string; price: number }) => {
      console.log(item, "item calculting")
      setCartItems((items) => {
        const existingItem = items.find((i) => i.id === item.id);
      //   console.log(existingItem, "existingItem")
        if (existingItem) {
          return items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        return [...items, { ...item, quantity: 1 }];
      });
    };

  const updateQuantity = (id: number, change: number) => {
    console.log(change, "___number logging here line 43_____")
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.length

  return (
    <CartContext.Provider value={{
        cartCount,
        addToCart,
        cartItems,
        updateQuantity,
        clearCart
    }}>
        {children}
    </CartContext.Provider>
  )

}

export const useCart = () => useContext(CartContext)