import { create } from "zustand";

export interface PCComponent {
  id: number;
  name: string;
  price: number;
  discount: number;
  image: string | any;
}

interface BuildPcState {
  selectedComponents: Record<string, PCComponent>; // category label (e.g. "Processor") as key
  selectComponent: (label: string, component: PCComponent) => void;
  removeComponent: (label: string) => void;
  clearBuild: () => void;
  getTotalPrice: () => number;
}

export const useBuildPcStore = create<BuildPcState>((set, get) => ({
  selectedComponents: {},
  selectComponent: (label, component) => set((state) => ({
    selectedComponents: {
      ...state.selectedComponents,
      [label]: component,
    },
  })),
  removeComponent: (label) => set((state) => {
    const updated = { ...state.selectedComponents };
    delete updated[label];
    return { selectedComponents: updated };
  }),
  clearBuild: () => set({ selectedComponents: {} }),
  getTotalPrice: () => {
    return Object.values(get().selectedComponents).reduce((sum, item) => {
      const discountedPrice = Math.round(item.price - (item.price * (item.discount || 0)) / 100);
      return sum + discountedPrice;
    }, 0);
  },
}));
