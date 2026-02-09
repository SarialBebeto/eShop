"use client";

import Image from "next/image";

type Product = {
  id: number;
  name: string;
  price: number;
  pictureUri: string;
};

export default function ProductCard({ 
    product,
    onAddToCart,
}: {
    product: Product;
    onAddToCart: (product: Product) => void;
}) {
    return (
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative h-48 bg-gray-100">
        <Image
          src={product.pictureUri}
          alt={product.name}
          fill
          className="object-contain p-4"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-lg mb-1 line-clamp-2">
          {product.name}
        </h3>

        <div className="mt-auto">
          <div className="text-xl font-bold text-blue-600 mb-3">
            €{product.price.toFixed(2)}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}  
