"use client";

import Image from "next/image";
import { BasketItem } from "@/lib/basket";

export default function CartItem({
    item,
    onChangeQuantity,
    onRemove,
}: {
    item: BasketItem;
    onChangeQuantity: (qty: number) => void;
    onRemove: () => void;
}) {
    return (
        <div className="flex gap-4 py-4 border-b">
      <div className="relative w-24 h-24 bg-gray-100 rounded">
        <Image
          src={item.pictureUri}
          alt={item.productName}
          fill
          className="object-contain p-2"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold">{item.productName}</h3>
        <div className="text-gray-600">€{item.unitPrice.toFixed(2)}</div>

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => onChangeQuantity(item.quantity - 1)}
            className="px-3 py-1 border rounded"
          >
            −
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() => onChangeQuantity(item.quantity + 1)}
            className="px-3 py-1 border rounded"
          >
            +
          </button>

          <button
            onClick={onRemove}
            className="ml-4 text-red-600 text-sm hover:underline"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="font-semibold">
        €{(item.unitPrice * item.quantity).toFixed(2)}
      </div>
    </div>
  );
}