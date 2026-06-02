import { create } from "zustand";

export interface CartItem {
  name: string;
  price: number;
  discount: number;
  image: string | any;
  quantity: number;
}

interface CartState {
  items: Record<string, CartItem>; // productName as key
  addItem: (name: string, price: number, discount: number, image: string | any) => void;
  removeItem: (name: string) => void;
  updateQuantity: (name: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItemsCount: () => number;
  getTotalAmount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: {},
  addItem: (name, price, discount, image) => set((state) => {
    const existing = state.items[name];
    const newQty = existing ? Math.min(6, existing.quantity + 1) : 1;
    return {
      items: {
        ...state.items,
        [name]: {
          name,
          price,
          discount,
          image,
          quantity: newQty,
        },
      },
    };
  }),
  removeItem: (name) => set((state) => {
    const updated = { ...state.items };
    delete updated[name];
    return { items: updated };
  }),
  updateQuantity: (name, quantity) => set((state) => {
    if (quantity <= 0) {
      const updated = { ...state.items };
      delete updated[name];
      return { items: updated };
    }
    const existing = state.items[name];
    if (!existing) return {};
    return {
      items: {
        ...state.items,
        [name]: {
          ...existing,
          quantity: Math.min(6, quantity),
        },
      },
    };
  }),
  clearCart: () => set({ items: {} }),
  getTotalItemsCount: () => {
    return Object.values(get().items).reduce((sum, item) => sum + item.quantity, 0);
  },
  getTotalAmount: () => {
    return Object.values(get().items).reduce((sum, item) => {
      const discountedPrice = Math.round(item.price - (item.price * (item.discount || 0)) / 100);
      return sum + discountedPrice * item.quantity;
    }, 0);
  },
}));
