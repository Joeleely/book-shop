"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { books } from "@/src/data/books";
import { useApp } from "@/src/lib/store";
import { Button, Container } from "@/src/components/ui";
import { PaymentTimeline } from "@/src/components/PaymentTimeline";

const money = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function CartPage() {
  const router = useRouter();
  const { cart, toggleSelect, setSelectAll, incQty, decQty, removeFromCart, startCheckoutFromSelected } = useApp();

  const rows = useMemo(() => {
    return cart
      .map((item) => ({ item, book: books.find((b) => b.id === item.bookId) }))
      .filter((r) => r.book);
  }, [cart]);

  const selectedTotal = rows.reduce((sum, r) => (r.item.selected ? sum + (r.book!.price * r.item.quantity) : sum), 0);
  const selectedCount = rows.reduce((sum, r) => sum + (r.item.selected ? 1 : 0), 0);

  if (rows.length === 0) {
    return (
      <Container>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-lg font-semibold">Your cart is empty</div>
          <Link href="/" className="mt-2 inline-block underline text-green-700 text-sm">Browse books</Link>
        </div>
      </Container>
    );
  }

  const allSelected = selectedCount === rows.length;

  return (
    <Container>
      <PaymentTimeline currentStep={1} />
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <div className="p-4 flex items-center justify-between border-b border-zinc-100">
          <div className="font-semibold">Cart</div>
          <button onClick={() => setSelectAll(!allSelected)} className="text-sm underline text-zinc-700" type="button">
            {allSelected ? "Unselect all" : "Select all"}
          </button>
        </div>

        <div className="divide-y divide-zinc-100">
          {rows.map(({ item, book }) => (
            <div key={item.bookId} className="p-4 flex gap-4 items-center">
              <input
                type="checkbox"
                checked={item.selected}
                onChange={() => toggleSelect(item.bookId)}
                className="h-4 w-4 accent-green-700"
              />

              <img src={book!.coverUrl} alt={book!.title} className="h-24 w-16 rounded-xl object-cover border border-zinc-200 bg-zinc-100" />

              <div className="flex-1 min-w-0">
                <Link href={`/books/${book!.id}`} className="font-semibold hover:underline line-clamp-1">
                  {book!.title}
                </Link>
                <div className="text-sm text-zinc-600 line-clamp-1">{book!.author}</div>
                <div className="mt-1 text-sm text-green-700 font-semibold">฿ {money(book!.price)}</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-full border border-zinc-200 bg-white overflow-hidden">
                  <button onClick={() => decQty(item.bookId)} className="h-9 w-10 flex items-center justify-center text-zinc-700 hover:bg-zinc-100" type="button">−</button>
                  <div className="h-9 w-10 flex items-center justify-center text-sm font-semibold">{item.quantity}</div>
                  <button onClick={() => incQty(item.bookId)} className="h-9 w-10 flex items-center justify-center text-zinc-700 hover:bg-zinc-100" type="button">+</button>
                </div>

                <div className="w-28 text-right">
                  <div className="text-xs text-zinc-500">Sub total</div>
                  <div className="font-semibold">฿ {money(book!.price * item.quantity)}</div>
                </div>

                <button onClick={() => removeFromCart(item.bookId)} className="h-9 w-9 rounded-full hover:bg-zinc-100 text-zinc-500" type="button" title="Remove">✕</button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-zinc-100 flex items-center justify-between">
          <div className="text-sm text-zinc-700">
            Selected total: <span className="text-lg font-bold text-green-700">฿ {money(selectedTotal)}</span>
          </div>
          <Button
            type="button"
            onClick={() => {
              const res = startCheckoutFromSelected();
              if (!res.ok) return;
              router.push("/checkout")
            }} disabled={selectedCount === 0}
          >
            Checkout selected
          </Button>
        </div>
      </div>
    </Container>
  );
}
