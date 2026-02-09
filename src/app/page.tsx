"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { books } from "@/src/data/books";
import { banners } from "@/src/data/banners";
import { Container } from "@/src/components/ui";
import { Banner } from "../components/Banner";
import { BestSellerBook } from "../components/BestSellerBook";
import { BookCard } from "../components/BookCard";

const format = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function HomePage() {
  const sp = useSearchParams();
  const q = (sp.get("q") ?? "").trim().toLowerCase();
  const cat = sp.get("cat") ?? "All";

  const list = useMemo(() => {
    return books
      .filter((b) => (cat === "All" ? true : b.category === cat))
      .filter((b) => {
        if (!q) return true;
        return (
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          (b.publisher ?? "").toLowerCase().includes(q)
        );
      });
  }, [q, cat]);

  const TOTAL = list.length;
  const homeList = list.slice(0, 20);

  return (
    <Container>
      <div className="grid gap-4">
        <Banner items={banners} />
        <BestSellerBook items={books} take={10} />
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm text-zinc-600">
            Showing <span className="font-semibold text-zinc-900">{Math.min(20, TOTAL)}</span> of{" "}
            <span className="font-semibold text-zinc-900">{TOTAL}</span> books
          </div>

          <Link
            href={`/books${sp.toString() ? `?${sp.toString()}` : ""}`}
            className="text-sm font-semibold text-blue-700 hover:underline"
          >
            View all →
          </Link>
        </div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {homeList.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      </div>
    </Container>
  );
}
