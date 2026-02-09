"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useApp } from "@/src/lib/store";
import { CategoryDrawer } from "@/src/components/CategoryDrawer";
import { Input } from "@/src/components/ui";
import { RiShoppingCartLine } from "react-icons/ri";
import { ProfileButton } from "./ProfileButton";

export function Navbar() {
  const { user, cart, logout } = useApp();
  const router = useRouter();
  const sp = useSearchParams();

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(sp.get("q") ?? "");
  }, [sp]);

  const cat = sp.get("cat") ?? "All";
  const quickCats = useMemo(() => ["Self-Development", "Psychology", "Novel", "Finance"], []);

  const goSearch = () => {
    const params = new URLSearchParams();
    if (search.trim()) params.set("q", search.trim());
    if (cat && cat !== "All") params.set("cat", cat);
    router.push("/" + (params.toString() ? `?${params.toString()}` : ""));
  };

  const goCategory = (nextCat: string) => {
  const params = new URLSearchParams();
  if (search.trim()) params.set("q", search.trim());
  if (nextCat && nextCat !== "All") {
    params.set("cat", nextCat);
  }

  router.push("/" + (params.toString() ? `?${params.toString()}` : ""));
};

  return (
    <>
      <header className="sticky top-0 z-40">
        <div className="bg-green-800">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
            <Link href="/" className="text-white font-bold text-xl tracking-tight">joevry.shop</Link>

            <div className="flex-1">
              <div className="relative">
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") goSearch(); }}
                  placeholder="Search by Product Name, Author, Publisher or Barcode"
                  className="pr-24"
                />
                <button
                  onClick={goSearch}
                  className="absolute right-1 top-1 h-8 px-4 rounded-full bg-green-700 text-white text-sm hover:bg-green-600"
                  type="button"
                >
                  Search
                </button>
              </div>
            </div>

            <Link href="/cart" className="flex items-center gap-1 text-white/90 hover:text-white text-sm font-medium">
              <RiShoppingCartLine className="w-6 h-6" />
              <div className="bg-red/30">
                {cartCount ? `(${cartCount})` : ""}
              </div>
            </Link>

            {user ? (
              <ProfileButton name={user.name} onLogout={logout} />
            ) : (
              <Link href="/login" className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-400">
                SIGN IN / REGISTER
              </Link>
            )}
          </div>
        </div>

        <div className="bg-white border-b border-zinc-200">
          <div className="mx-auto max-w-6xl px-4 py-2 flex items-center gap-3">
            <Link href="/" className="text-zinc-700 font-medium no-underline hover:underline">Home</Link>

            <div className="hidden md:flex items-center gap-2">
              {quickCats.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => goCategory(c)}
                  className={`px-2 py-2 hover:underline cursor-pointer ${cat === c ? "bg-zinc-100 rounded-md text-green-600" : "text-zinc-500 hover:text-zinc-900"}`}>
                  {c}
                </button>
              ))}
            </div>

            <div className="ml-auto">
              <button
                onClick={() => setDrawerOpen(true)}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
                type="button"
              >
                ☰ Category
              </button>
            </div>
          </div>
        </div>
      </header>

      <CategoryDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
