import { create } from "zustand";

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  discount: number;
  image: string | any;
  slug: string;
}

interface WishlistState {
  items: Record<string, WishlistItem>; // product name as key
  toggleWishlist: (item: WishlistItem) => void;
  isWishlisted: (name: string) => boolean;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: {},
  toggleWishlist: (item) => set((state) => {
    const updated = { ...state.items };
    if (updated[item.name]) {
      delete updated[item.name];
    } else {
      updated[item.name] = item;
    }
    return { items: updated };
  }),
  isWishlisted: (name) => !!get().items[name],
}));
