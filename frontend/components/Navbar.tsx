"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useBasketCount } from "@/hooks/useBasket";


export default function Navbar() {
  const { count } = useBasketCount();
  return (
   <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600"
        >
          eShop
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="hover:text-blue-600 font-medium"
          >
            Shop
          </Link>

          <Link
            href="/cart"
            className="relative flex items-center gap-2 hover:text-blue-600"
          >
            <ShoppingCart className="w-6 h-6" />

            {count > 0 && (
              <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
