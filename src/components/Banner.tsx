"use client";

import { useEffect, useMemo, useState } from "react";
import type { Banner as BannerType } from "@/src/data/banners";
import { useRouter } from "next/navigation";
import { BannerCard } from "./BannerCard";

export function Banner({
  items,
  autoMs = 4500,
}: {
  items: BannerType[];
  autoMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const safeItems = useMemo(() => items ?? [], [items]);
  const count = safeItems.length;

  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);

  useEffect(() => {
    if (count <= 1) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, autoMs);
    return () => window.clearInterval(t);
  }, [count, autoMs]);

  if (count === 0) return null;

  const leftIndex = (index - 1 + count) % count;
  const rightIndex = (index + 1) % count;

  return (
    <div className="relative rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
      <div className="relative h-[160px] sm:h-[200px] md:h-[240px]">
        {safeItems.map((b, i) => {
          let role: "active" | "left" | "right" | "hidden" = "hidden";
          if (i === index) role = "active";
          else if (i === leftIndex) role = "left";
          else if (i === rightIndex) role = "right";

          return (
            <BannerCard
              key={b.id}
              b={b}
              role={role}
              onClick={role === "left" ? prev : role === "right" ? next : undefined}
              onNavigate={(href) => router.push(href)}
            />
          );
        })}

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={prev}
              className="cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 text-zinc-900 shadow hover:bg-white z-30"
              aria-label="Previous banner"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 text-zinc-900 shadow hover:bg-white z-30"
              aria-label="Next banner"
            >
              ›
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-30">
              {safeItems.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-1.5 w-1.5 sm:h-2 sm:w-2 md:h-2.5 md:w-2.5 rounded-full transition cursor-pointer ${
                    i === index ? "bg-white" : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to banner ${i + 1}`}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
