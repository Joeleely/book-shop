"use client";

import { IconButton } from "@/src/components/ui";
import { useApp } from "@/src/lib/store";
import { RiShoppingCartLine } from "react-icons/ri";

export function AddToCartButton({ bookId, disabled }: { bookId: string; disabled?: boolean }) {
  const { addToCart } = useApp();
  return (
    <IconButton
      onClick={() => addToCart(bookId)}
      disabled={disabled}
      type="button"
      title={disabled ? "Out of stock" : "Add to cart"}
    >
      <RiShoppingCartLine />
    </IconButton>
  );
}
