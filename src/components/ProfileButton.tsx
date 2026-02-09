import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function ProfileButton({ name, onLogout }: { name: string; onLogout?: () => void; }) {
    const [openMenu, setOpenMenu] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onClickOutside = (e: MouseEvent) => {
            if (!ref.current) return;
            if (!ref.current.contains(e.target as Node)) {
                setOpenMenu(false);
            }
        };

        const onEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpenMenu(false);
        };

        document.addEventListener("mousedown", onClickOutside);
        document.addEventListener("keydown", onEsc);
        return () => {
            document.removeEventListener("mousedown", onClickOutside);
            document.removeEventListener("keydown", onEsc);
        };
    }, []);

    return (
        <div className="relative group" ref={ref}>
            <button className="text-white text-sm font-medium flex items-center gap-1 cursor-pointer" onClick={() => setOpenMenu((b) => !b)}>
                {name}
                <span>▾</span>
            </button>

            {openMenu ? (
                <div className="absolute right-0 top-full mt-2 w-40 rounded-xl bg-white shadow-lg border border-zinc-200 z-50 transition">
                    <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm hover:bg-zinc-100 rounded-xl"
                    >
                        My Profile
                    </Link>
                    <Link
                        href="/profile/orders"
                        className="block px-4 py-2 text-sm hover:bg-zinc-100"
                    >
                        My Orders
                    </Link>
                    <button
                        onClick={onLogout}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 text-red-600"
                    >
                        Logout
                    </button>
                </div>
            ) : null}

        </div>
    );
}