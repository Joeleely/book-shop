"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { books } from "@/src/data/books";
import { Container } from "@/src/components/ui";
import { BookCard } from "@/src/components/BookCard";

const PER_PAGE = 10;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function AllBooksPage() {
  const router = useRouter();
  const sp = useSearchParams();

  const q = (sp.get("q") ?? "").trim().toLowerCase();
  const cat = sp.get("cat") ?? "All";

  const pageRaw = Number(sp.get("page") ?? "1");
  const pageFromUrl = Number.isFinite(pageRaw) ? pageRaw : 1;

  const filtered = useMemo(() => {
    return books.filter((b) => {
      const matchCat = cat === "All" ? true : b.category === cat;
      if (!matchCat) return false;

      if (!q) return true;
      const hay = `${b.title} ${b.author} ${b.publisher ?? ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [q, cat]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const page = clamp(pageFromUrl, 1, totalPages);

  const pageItems = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, page]);

  const goPage = (nextPage: number) => {
    const params = new URLSearchParams(sp.toString());
    if (nextPage <= 1) params.delete("page");
    else params.set("page", String(nextPage));
    router.push(`/books${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const pageButtons = useMemo(() => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    const left = Math.max(2, page - 1);
    const right = Math.min(totalPages - 1, page + 1);

    if (left > 2) pages.push("...");

    for (let i = left; i <= right; i++) pages.push(i);

    if (right < totalPages - 1) pages.push("...");

    pages.push(totalPages);
    return pages;
  }, [page, totalPages]);

  return (
    <Container>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="text-2xl font-bold">All Books</div>
          <div className="mt-1 text-sm text-zinc-600">
            Found <span className="font-semibold text-zinc-900">{total}</span> books
            {cat !== "All" ? (
              <>
                {" "}in <span className="font-semibold text-zinc-900">{cat}</span>
              </>
            ) : null}
            {q ? (
              <>
                {" "}for <span className="font-semibold text-zinc-900">“{q}”</span>
              </>
            ) : null}
          </div>
          <div className="mt-1 text-xs text-zinc-500">
            Page {page} of {totalPages} • {PER_PAGE} per page
          </div>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {pageItems.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>

      {totalPages > 1 ? (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => goPage(page - 1)}
            disabled={page <= 1}
            className="h-10 rounded-full border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-50 disabled:opacity-50 disabled:hover:bg-white"
          >
            Prev
          </button>

          {pageButtons.map((p, idx) =>
            p === "..." ? (
              <span key={`dots-${idx}`} className="px-2 text-sm text-zinc-400">
                ...
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => goPage(p)}
                className={`h-10 w-10 rounded-full border text-sm font-semibold shadow-sm transition
                  ${
                    p === page
                      ? "border-green-700 bg-green-700 text-white"
                      : "border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50"
                  }`}
              >
                {p}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => goPage(page + 1)}
            disabled={page >= totalPages}
            className="h-10 rounded-full border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-50 disabled:opacity-50 disabled:hover:bg-white"
          >
            Next
          </button>
        </div>
      ) : null}
    </Container>
  );
}
