"use client";

import { useApp } from "@/src/lib/store";
import { RiShoppingCartLine } from "react-icons/ri";

export function AddToCartBigButton({bookId, quantity, disabled}: {bookId: string; quantity: number; disabled?: boolean;}) {
    const { addToCart } = useApp();

    return (
        <button
            type="button"
            disabled={disabled}
            onClick={() => {
                for (let i = 0; i < quantity; i++) addToCart(bookId);
            }}
            className={`w-full rounded-2xl px-4 py-3 text-xs font-semibold transition flex gap-2 justify-center
        ${disabled ? "bg-zinc-200 text-zinc-500 cursor-not-allowed" : "bg-green-700 text-white hover:bg-green-600"}`}
        >
            <RiShoppingCartLine className="w-4 h-4" />
            Add to cart
        </button>
    );
}