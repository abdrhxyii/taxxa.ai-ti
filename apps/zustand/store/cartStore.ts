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
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, change: number) => void;
  clearCart: () => void;
  getCartCount: () => number; 
}

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        cartItems: [],
        addToCart: (item) => {
          set((state) => {
            const existingItem = state.cartItems.find(i => i.id === item.id);
            if (existingItem) {
              return {
                cartItems: state.cartItems.map(i =>
                  i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                ),
              };
            }
            return {
              cartItems: [...state.cartItems, { ...item, quantity: 1 }],
            };
          });
        },
        updateQuantity: (id, change) => {
          set((state) => ({
            cartItems: state.cartItems
              .map(item =>
                item.id === id
                  ? { ...item, quantity: Math.max(0, item.quantity + change) }
                  : item
              )
              .filter(item => item.quantity > 0)
          }));
        },
        clearCart: () => set({ cartItems: [] }),
        getCartCount: () => get().cartItems.length, 
      }),
      {
        name: "cart-storage",
      }
    ),
  )
);