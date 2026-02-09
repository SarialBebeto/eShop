"use client";

import { useEffect, useState } from "react";
import { getBasket } from "@/lib/basket";

export function useBasketCount() {
  const [count, setCount] = useState(0);

  const refresh = async () => {
    try {
      const basket = await getBasket();
      const total = basket.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      setCount(total);
    } catch {
      setCount(0);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return { count, refresh };
}
