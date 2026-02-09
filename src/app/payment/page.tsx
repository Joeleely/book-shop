"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { books } from "@/src/data/books";
import { useApp } from "@/src/lib/store";
import type { PaymentMethod } from "@/src/lib/types";
import { Button, Container, Input } from "@/src/components/ui";
import { PaymentTimeline } from "@/src/components/PaymentTimeline";

const money = (n: number) =>
    n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function PaymentDraftPage() {
    const router = useRouter();
    const { user, checkout, finalizeCheckout } = useApp();

    const [method, setMethod] = useState<PaymentMethod>("PROMPTPAY");
    const [cardLast4, setCardLast4] = useState("4242");
    const [nameOnCard, setNameOnCard] = useState("")
    const [LastnameOnCard, setLastNameOnCard] = useState("")
    const [error, setError] = useState<string | null>(null);

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
                    <Button className="mt-3" variant="secondary" onClick={() => router.push("/cart")} type="button">
                        Back to cart
                    </Button>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <PaymentTimeline currentStep={3} />

            <div className="grid gap-4 md:grid-cols-[1fr_360px]">
                <div className="grid gap-4 rounded-2xl border border-zinc-200 bg-white shadow-sm p-6">

                    <div>
                        <div className="text-sm font-medium">Payment method</div>
                        <select
                            value={method}
                            onChange={(e) => setMethod(e.target.value as PaymentMethod)}
                            className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-600/20"
                        >
                            <option value="PROMPTPAY">PromptPay</option>
                            <option value="CARD">Bank card</option>
                            <option value="COD">Cash on Delivery (COD)</option>
                        </select>
                    </div>

                    {method === "CARD" ? (
                        <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
                            <div className="text-sm font-semibold">Bank card (mock)</div>
                            <div className="mt-3 grid grid-cols-2 gap-2">
                                <div className="flex items-center gap-2">
                                    Name:
                                    <Input value={nameOnCard} onChange={(e) => setNameOnCard(e.target.value)}/>
                                </div>
                                <div className="flex items-center gap-2">
                                    Lastname:
                                    <Input value={LastnameOnCard} onChange={(e) => setLastNameOnCard(e.target.value)} />
                                </div>
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-2">
                                <Input disabled value="•••• •••• ••••" />
                                <Input value={cardLast4} onChange={(e) => setCardLast4(e.target.value)} placeholder="Last 4 digits" />
                            </div>
                        </div>
                    ) : null}

                    {method === "PROMPTPAY" ? (
                        <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
                            <div className="text-sm font-semibold">PromptPay</div>
                            <div className="mt-2 text-sm text-zinc-600">Scan QR then press Pay to simulate success.</div>
                            <img src="https://static1.bigstockphoto.com/3/1/3/large1500/31320986.jpg" alt="PromptPay QR" className="mt-3 w-52 rounded-2xl border border-zinc-200 bg-white" />
                        </div>
                    ) : null}

                    {method === "COD" ? (
                        <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
                            <div className="text-sm font-semibold">Cash on Delivery</div>
                            <div className="mt-2 text-sm text-zinc-600">Order will be confirmed. Pay when delivered.</div>
                        </div>
                    ) : null}

                    {error ? <div className="mt-3 text-sm text-red-600">{error}</div> : null}

                    <div className="mt-5 flex gap-2">
                        <Button
                            onClick={() => {
                                const res = finalizeCheckout(method, { cardLast4 });
                                if (!res.ok) return setError(res.message ?? "Payment failed.");
                                router.push(`/orders/${res.orderId}`);
                            }}
                            type="button"
                        >
                            {method === "COD" ? "Confirm Order" : "Pay"}
                        </Button>
                        <Button variant="secondary" onClick={() => router.push("/checkout")} type="button">
                            Back to Shipping Address
                        </Button>
                        

                    </div>
                </div>

                <div className="grid rounded-2xl border border-zinc-200 bg-white shadow-sm p-6">
                    <div>
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
                    <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                        <div className="text-sm font-semibold text-zinc-800">Shipping address</div>
                        <div className="mt-2 text-sm text-zinc-700 whitespace-pre-line">
                            {checkout.shippingAddress}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
