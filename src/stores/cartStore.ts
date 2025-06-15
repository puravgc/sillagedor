import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  _id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  image: string;
  brand: string;
  stock: number;
  rating: number;
  quantity: number;
};

type CartState = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (_id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item: CartItem) => {
        const existing = get().cart.find((p) => p._id === item._id);
        if (existing) {
          set({
            cart: get().cart.map((p) =>
              p._id === item._id
                ? { ...p, quantity: p.quantity + item.quantity }
                : p
            ),
          });
        } else {
          set({ cart: [...get().cart, item] });
        }
      },

      removeFromCart: (_id: string) =>
        set({ cart: get().cart.filter((p) => p._id !== _id) }),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage", // Key in localStorage
    }
  )
);
