"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { books } from "@/src/data/books";
import { useApp } from "@/src/lib/store";
import { Button, Container, Textarea } from "@/src/components/ui";
import { PaymentTimeline } from "@/src/components/PaymentTimeline";

const money = (n: number) =>
  n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function CheckoutPage() {
  const router = useRouter();
  const { user, checkout, updateCheckoutAddress, clearCheckout } = useApp();
  const [shippingAddress, setShippingAddress] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (checkout) setShippingAddress(checkout.shippingAddress ?? "");
  }, [checkout]);

  const summary = useMemo(() => {
    if (!checkout) return [];
    return checkout.items
      .map((i) => ({ ...i, book: books.find((x) => x.id === i.bookId) }))
      .filter((r) => r.book);
  }, [checkout]);

  const total = summary.reduce((sum, r) => sum + r.book!.price * r.quantity, 0);

  if (!user) {
    return (
      <Container>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-lg font-semibold">Please login first</div>
          <Button className="mt-3" onClick={() => router.push("/login")} type="button">
            Go to login
          </Button>
        </div>
      </Container>
    );
  }

  if (!checkout || summary.length === 0) {
    return (
      <Container>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-lg font-semibold">No checkout session</div>
          <div className="mt-1 text-sm text-zinc-600">
            Go back to cart and select items to checkout.
          </div>
          <Button className="mt-3" variant="secondary" onClick={() => router.push("/cart")} type="button">
            Back to cart
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <PaymentTimeline currentStep={2} />

      <div className="grid gap-4 md:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm p-6">
          <div className="text-lg font-semibold">Shipping address</div>

          <div className="mt-3">
            <Textarea
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="Name, phone, address..."
              rows={5}
            />
            {error ? <div className="mt-2 text-sm text-red-600">{error}</div> : null}
          </div>

          <div className="mt-4 flex gap-2">
            <Button
              onClick={() => {
                const res = updateCheckoutAddress(shippingAddress);
                if (!res.ok) return setError(res.message ?? "Invalid address.");
                router.push("/payment");
              }}
              type="button"
            >
              Continue to payment
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
                clearCheckout();
                router.push("/cart");
              }}
              type="button"
            >
              Back to cart
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm p-6">
          <div className="text-lg font-semibold">Order summary</div>

          <div className="mt-3 grid gap-2 text-sm">
            {summary.map((r) => (
              <div key={r.bookId} className="flex justify-between gap-3">
                <div className="min-w-0">
                  <div className="line-clamp-1">{r.book!.title}</div>
                  <div className="text-zinc-500">× {r.quantity}</div>
                </div>
                <div className="font-semibold">฿ {money(r.book!.price * r.quantity)}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t border-zinc-100 pt-3 flex items-center justify-between">
            <div className="text-sm text-zinc-600">Total</div>
            <div className="text-xl font-bold text-green-700">฿ {money(total)}</div>
          </div>
        </div>
      </div>
    </Container>
  );
}
