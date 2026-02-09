"use client";

import Link from "next/link";
import { books } from "@/src/data/books";
import { Container, Badge } from "@/src/components/ui";
import { useParams } from "next/navigation";
import { useState } from "react";
import { AddToCartBigButton } from "@/src/components/AddToCartBigButton";
import { Review } from "@/src/components/Review";

const format = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function BookDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const book = books.find((b) => b.id === id);

  const [qty, setQty] = useState(1);

  if (!id || !book) {
    return (
      <Container>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-xl font-semibold">Book not found</div>
          <Link href="/" className="mt-3 inline-block underline text-sm text-green-700">Back to home</Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <div className="p-6 grid gap-6 md:grid-cols-[280px_1fr]">
          <img src={book.coverUrl} alt={book.title} className="w-full rounded-2xl border border-zinc-200 object-cover bg-zinc-100" />
          <div className="flex">
            <div className="w-full pr-7">
              <div className="text-2xl font-bold">{book.title}</div>
              <div className="mt-1 text-zinc-600">{book.author}</div>

              <div className="mt-3 flex flex-wrap gap-2">
                <Badge>{book.category}</Badge>
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${book.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-50 text-red-600"}`}>{book.stock > 0 ? "In stock" : "Out of stock"}</span>
              </div>

              <div className="mt-4 flex items-end gap-2">
                <div className="text-2xl font-bold text-green-700">฿ {format(book.price)}</div>
                {book.oldPrice ? <div className="text-zinc-400 line-through">฿ {format(book.oldPrice)}</div> : null}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex-grow content-center">
                <div className="flex mb-3">
                  <p className="text-sm font-medium text-zinc-700 flex items-center mr-2">Quantity:</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={qty}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        if (Number.isNaN(v)) return;
                        setQty(Math.max(1, Math.min(10, v)));
                      }}
                      className="w-24 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600/20"
                    />
                  </div>
                </div>
                <AddToCartBigButton
                  bookId={book.id}
                  quantity={qty}
                  disabled={book.stock <= 0}
                />
              </div>
              <Link href="/" className="ml-auto text-base underline text-zinc-400 flex-none">Back</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <p className="text-2xl font-bold">Description: {book.title}</p>
        <div className="mt-4 text-base leading-relaxed text-zinc-700">{book.description}</div>
      </div>
      <Review bookId={book.id} />

    </Container>
  );
}
