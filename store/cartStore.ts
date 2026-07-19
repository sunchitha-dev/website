import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string, variant?: string) => void;
  updateQuantity: (id: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

const STORAGE_KEY = "noir-roast-cart";

function loadFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // silently fail
  }
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (item) => {
    const { items } = get();
    const existing = items.find(
      (i) => i.id === item.id && i.variant === item.variant
    );

    let next: CartItem[];
    if (existing) {
      next = items.map((i) =>
        i.id === item.id && i.variant === item.variant
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
    } else {
      next = [...items, { ...item, quantity: 1 }];
    }

    set({ items: next });
    saveToStorage(next);
  },

  removeItem: (id, variant) => {
    const { items } = get();
    const next = items.filter(
      (i) => !(i.id === id && i.variant === variant)
    );
    set({ items: next });
    saveToStorage(next);
  },

  updateQuantity: (id, quantity, variant) => {
    const { items } = get();
    const next =
      quantity <= 0
        ? items.filter((i) => !(i.id === id && i.variant === variant))
        : items.map((i) =>
            i.id === id && i.variant === variant
              ? { ...i, quantity: Math.min(quantity, 10) }
              : i
          );
    set({ items: next });
    saveToStorage(next);
  },

  clearCart: () => {
    set({ items: [] });
    saveToStorage([]);
  },

  totalItems: () => {
    return get().items.reduce((sum, i) => sum + i.quantity, 0);
  },

  totalPrice: () => {
    return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  },
}));

// Hydrate on load (client-side)
if (typeof window !== "undefined") {
  const stored = loadFromStorage();
  if (stored.length > 0) {
    useCartStore.setState({ items: stored });
  }
}
