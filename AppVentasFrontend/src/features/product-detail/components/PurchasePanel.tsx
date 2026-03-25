"use client";

import { useRouter } from "next/navigation";

import { T } from "../theme/tokens";
import PrimaryBtn from "../ui/PrimaryBtn";
import type { ProductDetail } from "../types/product-detail.types";
import { usePurchasePanel } from "../hooks/usePurchasePanel";
import { useToast } from "../hooks/useToast";
import { addOrMergeCartItem } from "../../cart/data/cartStorage";

export default function PurchasePanel({
  product,
  isLoggedIn,
}: {
  product: ProductDetail;
  isLoggedIn: boolean;
}) {
  const router = useRouter();
  const { toast, showToast } = useToast();
  const { qty, incQty, decQty, inCart, setInCart, price } = usePurchasePanel(product);

  const buildCartItem = () => ({
    id: product.id,
    name: product.name,
    category: product.category,
    img: product.images[0] || "",
    price,
    quantity: 1,
    billingCycle: "monthly",
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
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 32, fontWeight: 800, color: T.text, fontFamily: "'Sora',sans-serif", letterSpacing: "-1px" }}>${price}</span>
        </div>
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
        {!isLoggedIn && (
          <div
            style={{
              padding: "12px 14px",
              borderRadius: 10,
              border: `1px dashed ${T.border}`,
              background: T.surface,
              fontSize: 13,
              color: T.sub,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <span style={{ fontWeight: 600, color: T.text }}>Necesitas iniciar sesión para comprar.</span>
            <button
              onClick={() => router.push("/navigation/auth/login")}
              style={{
                border: "none",
                background: T.accent,
                color: "#fff",
                borderRadius: 8,
                padding: "8px 12px",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              Iniciar sesión
            </button>
          </div>
        )}

        <PrimaryBtn onClick={handleCart} fullWidth size="lg" disabled={!isLoggedIn || inCart}>
          {inCart ? "En el carrito" : "Agregar al carrito"}
        </PrimaryBtn>

        <PrimaryBtn onClick={handleBuyNow} fullWidth size="lg" disabled={!isLoggedIn}>
          Comprar ahora
        </PrimaryBtn>
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
