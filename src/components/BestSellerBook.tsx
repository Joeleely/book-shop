"use client";

import { useMemo, useRef } from "react";
import type { Book } from "@/src/data/books";
import { BookCard } from "./BookCard";

export function BestSellerBook({
    items,
    take = 10,
}: {
    items: Book[];
    take?: number;
}) {

    const list = useMemo(() => {
        const best = items.filter((b) => b.isBestSeller);
        const best10 = best.slice(0, take);

        if (best10.length >= take) return best10;

        const bestIds = new Set(best10.map((b) => b.id));
        const fillers = items.filter((b) => !bestIds.has(b.id)).slice(0, take - best10.length);
        return [...best10, ...fillers];
    }, [items, take]);

    const scrollRef = useRef<HTMLDivElement | null>(null);

    const scrollByAmount = (direction: "prev" | "next") => {
        const container = scrollRef.current;
        if (!container) return;

        const baseAmount = container.clientWidth * 0.8;
        const amount = direction === "prev" ? -baseAmount : baseAmount;

        container.scrollBy({
            left: amount,
            behavior: "smooth",
        });
    };

    if (list.length === 0) return null;

    return (
        <section className="mt-4 w-full min-w-0">
            <div className="mb-3 flex items-end justify-between gap-3">
                <div>
                    <div className="text-xl font-bold text-zinc-900">Best Seller</div>
                    <div className="mt-1 text-sm text-zinc-500">
                        หนังสือขายดีแนะนำ ({Math.min(take, list.length)} รายการ)
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => scrollByAmount("prev")}
                        className="h-10 w-10 rounded-full border border-zinc-200 bg-white text-zinc-800 shadow-sm hover:bg-zinc-50"
                        aria-label="Previous"
                    >
                        ‹
                    </button>
                    <button
                        type="button"
                        onClick={() => scrollByAmount("next")}
                        className="h-10 w-10 rounded-full border border-zinc-200 bg-white text-zinc-800 shadow-sm hover:bg-zinc-50"
                        aria-label="Next"
                    >
                        ›
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="relative w-full overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm scroll-smooth"
            >
                <div className="flex w-max flex-nowrap gap-3 p-4 bg-green-100">
                    {list.map((b) => (
                        <div
                            key={b.id}
                            className="shrink-0 w-[210px] h-[360px]"
                        >
                            <BookCard
                                book={b}
                                size="sm"
                                showBestSellerTag
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
