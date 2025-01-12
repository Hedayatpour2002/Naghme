import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  favorites: string[];
  cart: string[];
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  getCartItems: () => string[];
  getFavoriteItems: () => string[];
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      favorites: [],
      cart: [],
      addToFavorites: (productId) =>
        set((state) => {
          if (!state.favorites.includes(productId)) {
            return { favorites: [...state.favorites, productId] };
          }
          return state;
        }),
      removeFromFavorites: (productId) =>
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== productId),
        })),
      addToCart: (productId) =>
        set((state) => {
          if (!state.cart.includes(productId)) {
            return { cart: [...state.cart, productId] };
          }
          return state;
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((id) => id !== productId),
        })),
      getCartItems: () => get().cart,
      getFavoriteItems: () => get().favorites,
    }),
    {
      name: "user-store",
      getStorage: () => localStorage,
    }
  )
);
