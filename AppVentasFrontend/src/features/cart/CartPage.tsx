"use client";

import { useEffect, useState } from "react";

import { Header } from "./sections/Header";
import { ProgressSteps } from "./sections/ProgressSteps";
import { CartItem } from "./sections/CartItem";
import { PromoCodeInput } from "./sections/PromoCodeInput";
import { OrderSummary } from "./sections/OrderSummary";
import { EmptyCart } from "./sections/EmptyCart";
import { tokens } from "./theme/tokens";
import type { CartItem as CartItemType, PromoCode } from "./types";
import { clearCartItems, getCartItems, saveCartItems } from "./data/cartStorage";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8009").replace(/\/$/, "");

type CheckoutResponse = {
  success?: boolean;
  message?: string;
  data?: {
    order_id?: number;
    order_name?: string;
    amount_total?: number;
  };
};

export default function CartPage() {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [promoDiscount, setPromoDiscount] = useState<PromoCode | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    setItems(getCartItems());
  }, []);

  const persist = (next: CartItemType[]) => {
    setItems(next);
    saveCartItems(next);
  };

  const handleUpdate = (id: number, billingCycle: CartItemType["billingCycle"], updates: Partial<CartItemType>) => {
    const next = items.map((item) => {
      if (item.id !== id || item.billingCycle !== billingCycle) {
        return item;
      }
      return { ...item, ...updates };
    });
    persist(next);
  };

  const handleRemove = (id: number, billingCycle: CartItemType["billingCycle"]) => {
    const next = items.filter((item) => !(item.id === id && item.billingCycle === billingCycle));
    persist(next);
  };

  const handleCheckout = async () => {
    if (!items.length || checkoutLoading) return;

    setCheckoutLoading(true);

    try {
      const payload = {
        items: items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity * item.users,
          price_unit: item.billingCycle === "annual" ? item.price * 12 : item.price,
        })),
      };

      const response = await fetch(`${API_BASE_URL}/api/pos/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const body = (await response.json()) as CheckoutResponse;

      if (!response.ok || !body.success) {
        throw new Error(body.message || "No se pudo procesar la compra");
      }

      clearCartItems();
      setItems([]);
      alert(`Compra exitosa: ${body.data?.order_name || "Orden creada"}`);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Error al procesar la compra");
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { background:${tokens.bg}; -webkit-font-smoothing:antialiased; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-thumb { background:${tokens.border}; border-radius:3px; }
      `}</style>

      <Header />

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 32px 64px" }}>
        <ProgressSteps current={0} />

        <div style={{ marginBottom: 32 }}>
          <h1
            style={{
              fontSize: "clamp(22px, 3vw, 28px)",
              fontWeight: 800,
              color: tokens.text,
              letterSpacing: "-0.5px",
              lineHeight: 1.2,
              fontFamily: "'Sora',sans-serif",
              marginBottom: 6,
            }}
          >
            Tu carrito de compras
          </h1>
          <p style={{ fontSize: 14, color: tokens.sub, fontFamily: "'Sora',sans-serif" }}>
            {items.length === 0 ? "No hay productos" : `${items.length} producto${items.length > 1 ? "s" : ""} en tu carrito`}
          </p>
        </div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 32, alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {items.map((item) => (
                <CartItem
                  key={`${item.id}-${item.billingCycle}`}
                  item={item}
                  onUpdate={handleUpdate}
                  onRemove={handleRemove}
                />
              ))}

              <PromoCodeInput onApply={setPromoDiscount} />
            </div>

            <OrderSummary
              items={items}
              promoDiscount={promoDiscount}
              checkoutLoading={checkoutLoading}
              onCheckout={handleCheckout}
            />
          </div>
        )}
      </main>
    </>
  );
}
