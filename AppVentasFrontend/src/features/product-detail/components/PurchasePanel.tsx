"use client";

import { useRouter } from "next/navigation";

import { T } from "../theme/tokens";
import Pill from "../ui/Pill";
import PrimaryBtn from "../ui/PrimaryBtn";
import OutlineBtn from "../ui/OutlineBtn";
import type { ProductDetail } from "../types/product-detail.types";
import { usePurchasePanel } from "../hooks/usePurchasePanel";
import { useToast } from "../hooks/useToast";
import { addOrMergeCartItem } from "../../cart/data/cartStorage";

export default function PurchasePanel({ product }: { product: ProductDetail }) {
  const router = useRouter();
  const { toast, showToast } = useToast();
  const { plan, setPlan, qty, incQty, decQty, saved, setSaved, inCart, setInCart, price, annualDiscount } = usePurchasePanel(product);

  const buildCartItem = () => ({
    id: product.id,
    name: product.name,
    category: product.category,
    img: product.images[0] || "",
    price,
    quantity: 1,
    billingCycle: plan,
    users: qty,
  });

  const handleCart = () => {
    addOrMergeCartItem(buildCartItem());
    setInCart(true);
    showToast("Agregado al carrito", "success");
  };

  const handleBuyNow = () => {
    addOrMergeCartItem(buildCartItem());
    router.push("/navigation/cart");
  };

  const handleSave = () => {
    setSaved(!saved);
    showToast(saved ? "Eliminado de guardados" : "Guardado en tu lista", "success");
  };

  return (
    <div
      style={{
        position: "sticky",
        top: 82,
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(15,23,42,0.07)",
      }}
    >
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 28,
            right: 28,
            zIndex: 999,
            background: toast.type === "success" ? T.success : T.sub,
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            padding: "12px 20px",
            borderRadius: 10,
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            fontFamily: "'Sora',sans-serif",
          }}
        >
          {toast.msg}
        </div>
      )}

      <div style={{ padding: "20px 24px 0" }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", color: T.sub, textTransform: "uppercase", marginBottom: 10, fontFamily: "'Sora',sans-serif" }}>
          Plan de pago
        </p>

        <div style={{ display: "flex", gap: 0, background: T.bg, borderRadius: 10, padding: 3, border: `1px solid ${T.border}` }}>
          {[
            { key: "monthly" as const, label: "Mensual" },
            { key: "annual" as const, label: `Anual -${annualDiscount}%` },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setPlan(key)}
              style={{
                flex: 1,
                padding: "8px 0",
                borderRadius: 8,
                border: "none",
                background: plan === key ? T.surface : "transparent",
                boxShadow: plan === key ? "0 1px 4px rgba(15,23,42,0.08)" : "none",
                color: plan === key ? T.accent : T.sub,
                fontSize: 12,
                fontWeight: plan === key ? 700 : 500,
                cursor: "pointer",
                transition: "all .18s",
                fontFamily: "'Sora',sans-serif",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "20px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 32, fontWeight: 800, color: T.text, fontFamily: "'Sora',sans-serif", letterSpacing: "-1px" }}>${price}</span>
          <span style={{ fontSize: 13, color: T.sub, fontFamily: "'Sora',sans-serif" }}>/usuario/mes</span>
        </div>

        {plan === "monthly" && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 13, color: T.sub, textDecoration: "line-through", fontFamily: "'Sora',sans-serif" }}>${product.oldPrice}</span>
            <Pill bg={T.successBg} color={T.success}>-{Math.round((1 - product.price / product.oldPrice) * 100)}% por tiempo limitado</Pill>
          </div>
        )}

        {plan === "annual" && (
          <p style={{ fontSize: 12, color: T.success, fontWeight: 600, fontFamily: "'Sora',sans-serif" }}>
            Facturas ${price * 12 * qty}/ano - ahorras ${(product.price - price) * 12 * qty}
          </p>
        )}
      </div>

      <div style={{ padding: "18px 24px 0" }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", color: T.sub, textTransform: "uppercase", marginBottom: 10, fontFamily: "'Sora',sans-serif" }}>
          Usuarios
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 0, background: T.bg, border: `1px solid ${T.border}`, borderRadius: 9, overflow: "hidden", width: "fit-content" }}>
          <button onClick={decQty} style={{ width: 38, height: 38, border: "none", background: "transparent", cursor: "pointer", fontSize: 16, color: T.sub, display: "flex", alignItems: "center", justifyContent: "center" }}>-</button>
          <span style={{ minWidth: 40, textAlign: "center", fontSize: 14, fontWeight: 700, color: T.text, fontFamily: "'Sora',sans-serif" }}>{qty}</span>
          <button onClick={incQty} style={{ width: 38, height: 38, border: "none", background: "transparent", cursor: "pointer", fontSize: 16, color: T.sub, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
        </div>
      </div>

      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
        <PrimaryBtn onClick={handleCart} fullWidth size="lg">
          {inCart ? "En el carrito" : "Agregar al carrito"}
        </PrimaryBtn>

        <PrimaryBtn onClick={handleBuyNow} fullWidth size="lg">
          Comprar ahora
        </PrimaryBtn>

        <OutlineBtn
          onClick={handleSave}
          fullWidth
          active={saved}
          icon={
            <svg width="14" height="14" viewBox="0 0 14 14" fill={saved ? T.accent : "none"} stroke={saved ? T.accent : T.sub} strokeWidth="1.4">
              <path d="M3 2h8a1 1 0 011 1v9L7 9.5 2 12V3a1 1 0 011-1z" strokeLinejoin="round" />
            </svg>
          }
        >
          {saved ? "Guardado" : "Guardar para despues"}
        </OutlineBtn>
      </div>

      <div style={{ borderTop: `1px solid ${T.border}`, padding: "16px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { icon: "30D", text: "30 dias de prueba sin riesgo" },
          { icon: "SSL", text: "Pago 100% seguro y encriptado" },
          { icon: "NOW", text: "Activacion inmediata" },
        ].map(({ icon, text }) => (
          <div key={text} style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <span style={{ fontSize: 13 }}>{icon}</span>
            <span style={{ fontSize: 12, color: T.sub, fontFamily: "'Sora',sans-serif" }}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
