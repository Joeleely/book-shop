"use client";

import type { Banner as BannerType } from "@/src/data/banners";

export function BannerCard({
    b,
    role,
    onClick,
    onNavigate,
}: {
    b: BannerType;
    role: "active" | "left" | "right" | "hidden";
    onClick?: () => void;
    onNavigate: (href: string) => void;
}) {
    const base =
        "absolute inset-0 mx-auto w-[76%] sm:w-[68%] md:w-[60%] h-full rounded-2xl overflow-hidden " +
        "border border-zinc-200 bg-white shadow-sm " +
        "transform-gpu will-change-transform " +
        "transition-transform transition-opacity duration-500 ease-out";

    const roleClass =
        role === "active"
            ? "opacity-100 scale-100 translate-x-0 z-20"
            : role === "left"
                ? "opacity-70 scale-95 -translate-x-[58%] z-10"
                : role === "right"
                    ? "opacity-70 scale-95 translate-x-[58%] z-10"
                    : "opacity-0 scale-95 translate-x-0 pointer-events-none z-0";

    const clickable = Boolean(onClick) || (role === "active" && b.href);

    const handleClick = () => {
        if (onClick) return onClick();
        if (role === "active" && b.href) onNavigate(b.href);
    };

    return (
        <div
            className={`${base} ${roleClass} ${clickable ? "cursor-pointer" : ""}`}
            onClick={clickable ? handleClick : undefined}
        >
            <img src={b.imageUrl} alt={b.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 to-black/10" />
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white">
                <div className="text-lg font-bold sm:text-2xl md:text-3xl">{b.title}</div>
                {b.subtitle ? (
                    <div className="mt-1 text-xs text-white/90 sm:text-base">{b.subtitle}</div>
                ) : null}

                {b.href && role === "active" ? (
                    <div className="mt-3 inline-flex rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-zinc-900">
                        Shop now
                    </div>
                ) : null}
            </div>
        </div>
    );
}
