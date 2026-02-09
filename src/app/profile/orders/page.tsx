"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/src/lib/store";
import { Button, Container, Badge } from "@/src/components/ui";

const statusLabel: Record<string, string> = {
  PENDING_PAYMENT: "Pending payment",
  CONFIRMED: "Confirmed (COD)",
  PAID: "Paid",
  CANCELLED: "Cancelled",
};

export default function MyOrdersPage() {
  const router = useRouter();
  const { user, orders } = useApp();
  const visibleOrders = orders.filter((o) => o.status !== "DRAFT");

  if (!user) {
    return (
      <Container>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-lg font-semibold">Please login</div>
          <Button className="mt-3" onClick={() => router.push("/login")} type="button">Go to login</Button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b border-zinc-100 font-semibold">My Orders</div>

        <div className="p-4">
          {orders.length === 0 ? (
            <div className="text-sm text-zinc-600">
              No orders yet. <Link href="/" className="underline text-green-700">Browse books</Link>
            </div>
          ) : (
            <div className="grid gap-3">
              {visibleOrders.map((o) => (
                <Link key={o.id} href={`/orders/${o.id}`} className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4 hover:bg-zinc-100 transition">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold">{o.id}</div>
                      <div className="text-sm text-zinc-600">{new Date(o.createdAt).toLocaleString()}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>{statusLabel[o.status] ?? o.status}</Badge>
                      <div className="font-semibold text-green-700">฿ {o.total}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
