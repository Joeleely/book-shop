"use client";

import { categories } from "@/src/data/books";
import { useRouter, useSearchParams } from "next/navigation";
import { Divider } from "@/src/components/ui";

export function CategoryDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const sp = useSearchParams();

  const q = sp.get("q") ?? "";
  const cat = sp.get("cat") ?? "All";

  const go = (nextCat: string) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (nextCat && nextCat !== "All") params.set("cat", nextCat);
    router.push("/" + (params.toString() ? `?${params.toString()}` : ""));
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-40 ${open ? "" : "pointer-events-none"}`}>
      <div className={`absolute inset-0 bg-black/30 transition ${open ? "opacity-100" : "opacity-0"}`} onClick={onClose} />
      <aside className={`absolute right-0 top-0 h-full w-[320px] bg-white shadow-xl transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-4 flex items-center justify-between">
          <div className="font-semibold">Category</div>
          <button onClick={onClose} className="text-zinc-600 hover:text-zinc-900" type="button">✕</button>
        </div>
        <Divider />
        <div className="p-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => go(c)}
              className={`w-full text-left px-4 py-3 rounded-xl hover:bg-zinc-100 flex items-center justify-between ${((cat === "All" && c === "All") || cat === c) ? "bg-zinc-100" : ""}`}
              type="button"
            >
              <span>{c}</span>
              <span className="text-zinc-400">›</span>
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}
