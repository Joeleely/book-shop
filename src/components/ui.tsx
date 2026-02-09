import React from "react";

export function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl px-4 py-6">{children}</div>;
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-zinc-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

export function Button({
  children,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "danger" | "ghost" }) {
  const cls =
    variant === "primary"
      ? "bg-green-700 text-white hover:bg-green-600"
      : variant === "danger"
      ? "bg-red-600 text-white hover:bg-red-500"
      : variant === "ghost"
      ? "bg-transparent text-zinc-700 hover:bg-white/10"
      : "bg-zinc-200 text-zinc-900 hover:bg-zinc-300";

  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed ${cls} ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
}

export function IconButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full cursor-pointer hover:bg-green-600 bg-green-700 text-white transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-zinc-400 ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-600/20 ${props.className ?? ""}`}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-600/20 ${props.className ?? ""}`}
    />
  );
}

export function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs bg-zinc-100 text-zinc-700 ${className}`}>{children}</span>;
}

export function Divider() {
  return <div className="h-px w-full bg-zinc-200" />;
}
