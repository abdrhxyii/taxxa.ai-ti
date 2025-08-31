import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface CartStore {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (item: { id: number; title: string; price: number }) => void;
  updateQuantity: (id: number, change: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        cartItems: [],
        cartCount: 0,
        addToCart: (item) => {
          set((state) => {
            const existingItem = state.cartItems.find((i) => i.id === item.id);
            if (existingItem) {
              return {
                cartItems: state.cartItems.map((i) =>
                  i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                ),
                cartCount: state.cartItems.length,
              };
            }
            return {
              cartItems: [...state.cartItems, { ...item, quantity: 1 }],
              cartCount: state.cartItems.length + 1,
            };
          });
        },
        updateQuantity: (id, change) => {
          set((state) => {
            const updatedItems = state.cartItems
              .map((item) =>
                item.id === id
                  ? { ...item, quantity: Math.max(0, item.quantity + change) }
                  : item
              )
              .filter((item) => item.quantity > 0);
            return {
              cartItems: updatedItems,
              cartCount: updatedItems.length,
            };
          });
        },
        clearCart: () => set({ cartItems: [], cartCount: 0 }),
      }),
      {
        name: "cart-storage",
      }
    ),
  )
);