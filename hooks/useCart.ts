"use client";

import { useState, useCallback, useRef } from "react";
import { useCartStore, type CartItem } from "@/store/cartStore";

export function useCart() {
  const items = useCartStore((s) => s.items);
  const addItemStore = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantityStore = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalItems = useCartStore((s) => s.totalItems);
  const totalPrice = useCartStore((s) => s.totalPrice);

  const [addedId, setAddedId] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">) => {
      addItemStore(item);
      const key = `${item.id}-${item.variant ?? ""}`;
      setAddedId(key);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setAddedId(null), 1500);
    },
    [addItemStore]
  );

  const updateQuantity = useCallback(
    (id: string, quantity: number, variant?: string) => {
      updateQuantityStore(id, quantity, variant);
    },
    [updateQuantityStore]
  );

  const isAdded = useCallback(
    (id: string, variant?: string) => {
      return addedId === `${id}-${variant ?? ""}`;
    },
    [addedId]
  );

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isAdded,
  };
}
