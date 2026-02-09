import Link from "next/link";
import { AddToCartButton } from "@/src/components/AddToCartButton";
import type { Book } from "@/src/data/books";

const format = (n: number) =>
  n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export function BookCard({
  book,
  size = "md",
  showBestSellerTag = false,
}: {
  book: Book;
  size?: "md" | "sm";
  showBestSellerTag?: boolean;
}) {
  const isSmall = size === "sm";

  return (
    <div
      className={`relative h-full rounded-2xl bg-white border border-zinc-200 shadow-sm overflow-hidden ${isSmall ? "text-sm" : ""}`}>
      {showBestSellerTag ? (
        <div className="absolute left-4 top-4 z-10 rounded-full bg-red-600 px-2 py-0.5 text-xs font-semibold text-white">
          Best Seller
        </div>
      ) : null}

      <Link href={`/books/${book.id}`} className="block">
        <div className={isSmall ? "p-2" : "p-3"}>
          <img
            src={book.coverUrl}
            alt={book.title}
            className={`w-full rounded-xl object-cover border border-zinc-200 bg-zinc-100
              ${isSmall ? "aspect-[4/4]" : "aspect-[3/4]"}`}
          />
        </div>
      </Link>

      <div className={isSmall ? "px-2 pb-3" : "px-3 pb-4"}>
        <Link href={`/books/${book.id}`} className="block">
          <div
            className={`font-semibold leading-snug line-clamp-1 hover:underline
              ${isSmall ? "text-sm" : ""}`}
          >
            {book.title}
          </div>
        </Link>

        <div className="mt-1 text-sm text-zinc-600 line-clamp-1">
          {book.author}
        </div>

        <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
          <span className="text-yellow-400">★</span>
          <span>
            {book.avgRating} ({book.reviewCount})
          </span>
          <span className="ml-auto">{book.publisher ?? "Books"}</span>
        </div>

        <div className="mt-2">
          <div
            className={`${
              book.oldPrice ? "text-red-600/90" : "text-green-700"
            } ${isSmall ? "text-base" : "text-lg"} font-bold`}
          >
            ฿ {format(book.price)}
          </div>
          {book.oldPrice ? (
            <div className="text-sm text-zinc-400 line-through">
              ฿ {format(book.oldPrice)}
            </div>
          ) : null}
        </div>
      </div>
      <div className={`absolute ${isSmall ? "bottom-2 right-2" : "bottom-3 right-3"}`}>
        <AddToCartButton bookId={book.id} disabled={book.stock <= 0} />
      </div>
    </div>
  );
}
