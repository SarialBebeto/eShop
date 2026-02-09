"use client";

import { useEffect, useState } from "react";
import {
  Basket,
  getBasket,
  updateBasket,
} from "@/lib/basket";
import CartItem from "@/components/CartItem";
import Link from "next/link";

export default function CartPage() {
  const [basket, setBasket] = useState<Basket | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBasket()
      .then(setBasket)
      .catch(() => setBasket({ buyerId: "demo-user", items: [] }))
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
        <Link
          href="/"
          className="text-blue-600 hover:underline"
        >
          Continue shopping →
        </Link>
      </div>
    );
  }

  const total = basket.items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const updateItem = (index: number, quantity: number) => {
    const items = [...basket.items];

    if (quantity <= 0) {
      items.splice(index, 1);
    } else {
      items[index] = { ...items[index], quantity };
    }

    const updated = { ...basket, items };
    setBasket(updated);
    updateBasket(updated);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Items */}
      <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        {basket.items.map((item, i) => (
          <CartItem
            key={item.productId}
            item={item}
            onChangeQuantity={(qty) => updateItem(i, qty)}
            onRemove={() => updateItem(i, 0)}
          />
        ))}
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl shadow-sm p-6 h-fit">
        <h2 className="text-xl font-semibold mb-4">
          Order Summary
        </h2>

        <div className="flex justify-between mb-4">
          <span>Total</span>
          <span className="font-bold">
            €{total.toFixed(2)}
          </span>
        </div>

        <Link
          href="/checkout"
          className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
