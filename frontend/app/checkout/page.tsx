"use client";

import { useEffect, useState } from "react";
import { Basket, getBasket, clearBasket } from "@/lib/basket";
import { placeOrder } from "@/lib/orders";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [basket, setBasket] = useState<Basket | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getBasket()
      .then(setBasket)
      .catch(() => setBasket(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="h-40 bg-gray-200 animate-pulse rounded-xl" />;
  }

  if (!basket || basket.items.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-4">
          Your cart is empty
        </h2>
      </div>
    );
  }

  const total = basket.items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    setSubmitting(true);
    try {
      await placeOrder(basket);
      await clearBasket();
      router.push("/success");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6">
      <h1 className="text-2xl font-bold mb-6">
        Checkout
      </h1>

      {/* Order summary */}
      <div className="mb-6">
        {basket.items.map((item) => (
          <div
            key={item.productId}
            className="flex justify-between py-2 border-b"
          >
            <span>
              {item.productName} × {item.quantity}
            </span>
            <span>
              €{(item.unitPrice * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-lg font-semibold mb-6">
        <span>Total</span>
        <span>€{total.toFixed(2)}</span>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={submitting}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg transition"
      >
        {submitting ? "Placing order..." : "Place Order"}
      </button>
    </div>
  );
}
