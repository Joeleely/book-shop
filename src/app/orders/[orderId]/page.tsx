"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { books } from "@/src/data/books";
import { useApp } from "@/src/lib/store";
import { Badge, Button, Container } from "@/src/components/ui";

const statusLabel: Record<string, string> = {
  PENDING_PAYMENT: "Pending payment",
  CONFIRMED: "Confirmed (COD)",
  PAID: "Paid",
  CANCELLED: "Cancelled",
};

export default function OrderDetailPage() {
  const params = useParams<{orderId: string}>();
  const router = useRouter();
  const { user, orders, cancelOrder } = useApp();

  const order = useMemo(() => orders.find((o) => o.id === params.orderId), [orders, params.orderId]);

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

  if (!order) {
    return (
      <Container>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-lg font-semibold">Order not found</div>
          <Link href="/profile/orders" className="mt-2 inline-block underline text-green-700 text-sm">Back to My Orders</Link>
        </div>
      </Container>
    );
  }

  const items = order.items.map((i) => ({ ...i, book: books.find((x) => x.id === i.bookId) }));

  return (
    <Container>
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b border-zinc-100 flex items-center justify-between">
          <div className="font-semibold">Order {order.id}</div>
          <Badge>{statusLabel[order.status] ?? order.status}</Badge>
        </div>

        <div className="p-6 grid gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Total ฿ {order.total}</Badge>
            <div className="text-sm text-zinc-600">{new Date(order.createdAt).toLocaleString()}</div>
          </div>

          <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
            <div className="text-sm text-zinc-600">Shipping address</div>
            <div className="mt-1 text-sm">{order.shippingAddress}</div>
          </div>

          <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
            <div className="font-semibold">Items</div>
            <ul className="mt-2 text-sm text-zinc-700 grid gap-1">
              {items.map((r) => (
                <li key={r.bookId}>{r.book?.title ?? r.bookId} × {r.quantity}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
            <div className="font-semibold">Payment</div>
            {order.payment ? (
              <div className="mt-2 text-sm text-zinc-700 grid gap-1">
                <div>Method: {order.payment.method}</div>
                <div>Status: {order.payment.status}</div>
                {order.payment.last4 ? <div>Card: •••• {order.payment.last4}</div> : null}
                {order.payment.paidAt ? <div>Paid at: {new Date(order.payment.paidAt).toLocaleString()}</div> : null}
                {order.payment.method === "PROMPTPAY" && order.payment.promptPayQrUrl ? (
                  <img src={order.payment.promptPayQrUrl} alt="PromptPay QR" className="mt-3 w-44 rounded-2xl border border-zinc-200 bg-white" />
                ) : null}
              </div>
            ) : (
              <div className="mt-2 text-sm text-zinc-600">
                Not paid yet. <Link href={`/payment/${order.id}`} className="underline text-green-700">Go to payment</Link>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => router.push("/profile/orders")} type="button">Back</Button>
            {order.status === "PENDING_PAYMENT" ? (
              <Button variant="danger" onClick={() => { cancelOrder(order.id); router.refresh(); }} type="button">
                Cancel order
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </Container>
  );
}
