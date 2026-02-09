"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { books } from "@/src/data/books";
import type { CartItem, CheckoutDraft, Order, PaymentMethod, User } from "@/src/lib/types";
import { storage } from "@/src/lib/storage";

const LS_USER = "bookshop_user";
const LS_CART = "bookshop_cart";
const LS_CHECKOUT = "bookshop_checkout";
const LS_ORDERS = "bookshop_orders";

type AppState = {
  user: User | null;
  cart: CartItem[];
  orders: Order[];
  checkout: CheckoutDraft | null;

  login: (email: string, password: string) => { ok: boolean; message?: string };
  register: (name: string, email: string, password: string) => { ok: boolean; message?: string };
  logout: () => void;

  addToCart: (bookId: string) => void;
  setQty: (bookId: string, quantity: number) => void;
  incQty: (bookId: string) => void;
  decQty: (bookId: string) => void;
  removeFromCart: (bookId: string) => void;

  toggleSelect: (bookId: string) => void;
  setSelectAll: (selected: boolean) => void;

  createOrderFromSelected: (shippingAddress: string) => { ok: boolean; orderId?: string; message?: string };
  payOrder: (orderId: string, method: PaymentMethod, payload?: { cardLast4?: string }) => { ok: boolean; message?: string };
  cancelOrder: (orderId: string) => { ok: boolean; message?: string };
  updateOrderShippingAddress: (orderId: string, shippingAddress: string) => { ok: boolean; message?: string };

  startCheckoutFromSelected: () => { ok: boolean; message?: string };
  updateCheckoutAddress: (shippingAddress: string) => { ok: boolean; message?: string };
  clearCheckout: () => void;

  finalizeCheckout: (method: PaymentMethod, payload?: { cardLast4?: string }) => { ok: boolean; orderId?: string; message?: string };

};

const AppContext = createContext<AppState | null>(null);

const uid = () => Math.random().toString(16).slice(2, 10);

const calcTotal = (items: { bookId: string; quantity: number }[]) =>
  items.reduce((sum, item) => {
    const book = books.find((b) => b.id === item.bookId);
    return sum + (book ? book.price * item.quantity : 0);
  }, 0);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [checkout, setCheckout] = useState<import("./types").CheckoutDraft | null>(null);

  useEffect(() => {
    setUser(storage.get<User | null>(LS_USER, null));
    setCart(storage.get<CartItem[]>(LS_CART, []));
    setCheckout(storage.get(LS_CHECKOUT, null));
    setOrders(storage.get<Order[]>(LS_ORDERS, []));
  }, []);

  useEffect(() => storage.set(LS_USER, user), [user]);
  useEffect(() => storage.set(LS_CART, cart), [cart]);
  useEffect(() => storage.set(LS_CHECKOUT, checkout), [checkout]);
  useEffect(() => storage.set(LS_ORDERS, orders), [orders]);

  const login: AppState["login"] = (email, password) => {
    const existing = storage.get<User | null>(LS_USER, null);
    if (!email || !password) return { ok: false, message: "Please enter email and password." };
    if (existing && existing.email.toLowerCase() === email.toLowerCase()) {
      setUser(existing);
      return { ok: true };
    }
    const demo: User = { id: "u_demo", name: "DUser", email };
    setUser(demo);
    return { ok: true };
  };

  const register: AppState["register"] = (name, email, password) => {
    if (!name || !email || !password) return { ok: false, message: "Please fill all fields." };
    const newUser: User = { id: "u_" + uid(), name, email };
    setUser(newUser);
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    setCart([]);
  };

  const addToCart = (bookId: string) => {
    setCart((prev) => {
      const found = prev.find((i) => i.bookId === bookId);
      if (found) {
        return prev.map((i) =>
          i.bookId === bookId ? { ...i, quantity: Math.min(99, i.quantity + 1), selected: true } : i
        );
      }
      return [...prev, { bookId, quantity: 1, selected: true }];
    });
  };

  const startCheckoutFromSelected: AppState["startCheckoutFromSelected"] = () => {
    if (!user) return { ok: false, message: "Please login first." };

    const selected = cart.filter((i) => i.selected);
    if (selected.length === 0) return { ok: false, message: "Please select at least one item." };

    for (const item of selected) {
      const book = books.find((b) => b.id === item.bookId);
      if (!book) return { ok: false, message: "Book not found." };
      if (book.stock <= 0) return { ok: false, message: `"${book.title}" is out of stock.` };
    }

    setCheckout({
      items: selected.map((i) => ({ bookId: i.bookId, quantity: i.quantity })),
      shippingAddress: "",
    });

    return { ok: true };
  };

  const updateCheckoutAddress: AppState["updateCheckoutAddress"] = (shippingAddress) => {
    if (!shippingAddress.trim()) return { ok: false, message: "Please enter shipping address." };
    if (!checkout) return { ok: false, message: "No checkout session." };
    setCheckout({ ...checkout, shippingAddress });
    return { ok: true };
  };

  const clearCheckout = () => setCheckout(null);

  const finalizeCheckout: AppState["finalizeCheckout"] = (method, payload) => {
    if (!user) return { ok: false, message: "Please login first." };
    if (!checkout) return { ok: false, message: "No checkout session." };
    if (checkout.items.length === 0) return { ok: false, message: "No items in checkout." };
    if (!checkout.shippingAddress.trim()) return { ok: false, message: "Shipping address is required." };

    const orderId = "ORD-" + uid().toUpperCase();
    const total = calcTotal(checkout.items);

    const order: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      status: method === "COD" ? "CONFIRMED" : "PAID",
      items: checkout.items,
      shippingAddress: checkout.shippingAddress,
      total,
      payment:
        method === "COD"
          ? { method, amount: total, status: "PENDING" }
          : {
            method,
            amount: total,
            status: "PAID",
            paidAt: new Date().toISOString(),
            last4: method === "CARD" ? payload?.cardLast4 ?? "4242" : undefined,
            promptPayQrUrl: method === "PROMPTPAY" ? "https://picsum.photos/seed/promptpay-qr/420/420" : undefined,
          },
    };
    setOrders((prev) => [order, ...prev]);

    const purchasedIds = new Set(checkout.items.map((x) => x.bookId));
    setCart((prev) => prev.filter((i) => !purchasedIds.has(i.bookId)));

    setCheckout(null);
    return { ok: true, orderId };
  };

  const setQty = (bookId: string, quantity: number) => {
    const q = Math.max(1, Math.min(99, quantity));
    setCart((prev) => prev.map((i) => (i.bookId === bookId ? { ...i, quantity: q } : i)));
  };

  const incQty = (bookId: string) => setCart((prev) => prev.map((i) => (i.bookId === bookId ? { ...i, quantity: Math.min(99, i.quantity + 1) } : i)));
  const decQty = (bookId: string) => setCart((prev) => prev.map((i) => (i.bookId === bookId ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i)));

  const removeFromCart = (bookId: string) => setCart((prev) => prev.filter((i) => i.bookId !== bookId));

  const toggleSelect = (bookId: string) => setCart((prev) => prev.map((i) => (i.bookId === bookId ? { ...i, selected: !i.selected } : i)));
  const setSelectAll = (selected: boolean) => setCart((prev) => prev.map((i) => ({ ...i, selected })));

  const createOrderFromSelected: AppState["createOrderFromSelected"] = (shippingAddress) => {
    if (!user) return { ok: false, message: "Please login first." };
    if (!shippingAddress.trim()) return { ok: false, message: "Please enter shipping address." };

    const selectedItems = cart.filter((i) => i.selected);
    if (selectedItems.length === 0) return { ok: false, message: "Please select at least one item." };

    for (const item of selectedItems) {
      const book = books.find((b) => b.id === item.bookId);
      if (!book) return { ok: false, message: "Book not found." };
      if (book.stock <= 0) return { ok: false, message: `"${book.title}" is out of stock.` };
    }

    const orderId = "ORD-" + uid().toUpperCase();
    const items = selectedItems.map(({ bookId, quantity }) => ({ bookId, quantity }));
    const total = calcTotal(items);

    const order: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      status: "DRAFT",
      items,
      shippingAddress,
      total,
    };

    setOrders((prev) => [order, ...prev]);
    setCart((prev) => prev.filter((i) => !i.selected));
    return { ok: true, orderId };
  };

  const payOrder: AppState["payOrder"] = (orderId, method, payload) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return { ok: false, message: "Order not found." };
    if (order.status === "CANCELLED") return { ok: false, message: "Order is cancelled." };

    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;

        if (method === "COD") {
          return { ...o, status: "CONFIRMED", payment: { method, amount: o.total, status: "PENDING" } };
        }

        if (method === "PROMPTPAY") {
          return {
            ...o,
            status: "PAID",
            payment: {
              method,
              amount: o.total,
              status: "PAID",
              paidAt: new Date().toISOString(),
              promptPayQrUrl: "https://picsum.photos/seed/promptpay-qr/420/420",
            },
          };
        }

        return {
          ...o,
          status: "PAID",
          payment: {
            method,
            amount: o.total,
            status: "PAID",
            paidAt: new Date().toISOString(),
            last4: payload?.cardLast4 ?? "4242",
          },
        };
      })
    );

    return { ok: true };
  };

  const cancelOrder: AppState["cancelOrder"] = (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return { ok: false, message: "Order not found." };
    if (order.status === "PAID") return { ok: false, message: "Paid orders can't be cancelled in this mock." };

    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: "CANCELLED" } : o)));
    return { ok: true };
  };

  const updateOrderShippingAddress: AppState["updateOrderShippingAddress"] = (orderId, shippingAddress) => {
    if (!shippingAddress.trim()) return { ok: false, message: "Please enter shipping address." };

    const exists = orders.some((o) => o.id === orderId);
    if (!exists) return { ok: false, message: "Order not found." };

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, shippingAddress } : o))
    );

    return { ok: true };
  };

  const value = useMemo<AppState>(
    () => ({
      user,
      cart,
      orders,
      checkout,
      login,
      register,
      logout,
      addToCart,
      setQty,
      incQty,
      decQty,
      removeFromCart,
      toggleSelect,
      setSelectAll,
      createOrderFromSelected,
      payOrder,
      cancelOrder,
      updateOrderShippingAddress,
      startCheckoutFromSelected,
      updateCheckoutAddress,
      clearCheckout,
      finalizeCheckout,
    }),
    [user, cart, orders, checkout]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
