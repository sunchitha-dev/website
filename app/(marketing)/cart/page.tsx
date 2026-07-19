"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import CartItemCard from "@/components/cart/CartItemCard";
import OrderSummary from "@/components/cart/OrderSummary";
import EmptyCart from "@/components/cart/EmptyCart";
import CartToast from "@/components/ui/CartToast";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } =
    useCart();
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const handleClear = useCallback(() => {
    clearCart();
    setToastMsg("Cart cleared");
    setToastVisible(true);
  }, [clearCart]);

  const subtotal = totalPrice();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-28 pb-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <EmptyCart />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <h1 className="font-display text-4xl md:text-5xl text-cream mb-2">
              Your Selection
            </h1>
            <p className="text-sm text-cream/40">
              {totalItems()} {totalItems() === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          <button
            onClick={handleClear}
            className="text-xs text-cream/30 hover:text-cream underline underline-offset-2 transition-colors duration-200 mt-2"
          >
            Clear All
          </button>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Items */}
          <div className="flex-1 min-w-0">
            {items.map((item) => (
              <CartItemCard
                key={`${item.id}-${item.variant ?? ""}`}
                item={item}
                onRemove={removeItem}
                onUpdateQuantity={updateQuantity}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[360px] flex-shrink-0">
            <div className="lg:sticky lg:top-32">
              <OrderSummary subtotal={subtotal} />
              <div className="mt-6 text-center">
                <Link
                  href="/shop"
                  className="text-xs text-cream/40 hover:text-cream underline underline-offset-2 transition-colors duration-200"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CartToast
        message={toastMsg}
        visible={toastVisible}
        onDone={() => setToastVisible(false)}
      />
    </div>
  );
}
