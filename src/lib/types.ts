export type CartItem = { bookId: string; quantity: number; selected: boolean; };

export type OrderStatus = "DRAFT" | "PENDING_PAYMENT" | "CONFIRMED" | "PAID" | "CANCELLED";
export type PaymentMethod = "CARD" | "PROMPTPAY" | "COD";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "CANCELLED";

export type Payment = {
  method: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  promptPayQrUrl?: string;
  last4?: string;
  paidAt?: string;
};

export type Order = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  items: { bookId: string; quantity: number }[];
  shippingAddress: string;
  total: number;
  payment?: Payment;
};

export type CheckoutDraft = {
  items: { bookId: string; quantity: number }[];
  shippingAddress: string;
};


export type User = { id: string; name: string; email: string; };
