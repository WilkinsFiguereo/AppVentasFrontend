/* cart summary with checkout action */
import type { CartItem, PromoCode } from "../types";
import { tokens } from "../theme/tokens";
import { useCartCalculations } from "../hooks/useCartCalculations";

interface OrderSummaryProps {
  items: CartItem[];
  promoDiscount: PromoCode | null;
  checkoutLoading?: boolean;
  onCheckout?: () => void;
}

const GUARANTEES = [
  { icon: "OK", text: "Pago 100% seguro" },
  { icon: "30D", text: "30 dias de garantia" },
  { icon: "NOW", text: "Activacion inmediata" },
];

export function OrderSummary({ items, promoDiscount, checkoutLoading = false, onCheckout }: OrderSummaryProps) {
  const { subtotal, discount, tax, total } = useCartCalculations(items, promoDiscount);

  return (
    <div
      style={{
        position: "sticky",
        top: 84,
        background: tokens.surface,
        borderRadius: 14,
        border: `1px solid ${tokens.border}`,
        padding: "24px",
        boxShadow: "0 4px 24px rgba(15,23,42,0.06)",
      }}
    >
      <h3
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: tokens.text,
          fontFamily: "'Sora',sans-serif",
          marginBottom: 20,
          letterSpacing: "-0.2px",
        }}
      >
        Resumen del pedido
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, color: tokens.sub, fontFamily: "'Sora',sans-serif" }}>Subtotal</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: tokens.text, fontFamily: "'Sora',sans-serif" }}>
            ${subtotal.toLocaleString()}
          </span>
        </div>

        {discount > 0 && (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, color: tokens.success, fontFamily: "'Sora',sans-serif" }}>
              Descuento {promoDiscount && `(${(promoDiscount.discount * 100).toFixed(0)}%)`}
            </span>
            <span style={{ fontSize: 13, fontWeight: 600, color: tokens.success, fontFamily: "'Sora',sans-serif" }}>
              -${discount.toLocaleString()}
            </span>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, color: tokens.sub, fontFamily: "'Sora',sans-serif" }}>IVA (18%)</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: tokens.text, fontFamily: "'Sora',sans-serif" }}>
            ${tax.toLocaleString()}
          </span>
        </div>
      </div>

      <div style={{ height: 1, background: tokens.border, margin: "20px 0" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: tokens.text, fontFamily: "'Sora',sans-serif" }}>Total</span>
        <span style={{ fontSize: 26, fontWeight: 800, color: tokens.text, fontFamily: "'Sora',sans-serif", letterSpacing: "-0.6px" }}>
          ${total.toLocaleString()}
        </span>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        disabled={checkoutLoading || items.length === 0}
        style={{
          width: "100%",
          padding: "14px 0",
          background: checkoutLoading ? "#1D4ED8" : tokens.accent,
          color: "#fff",
          border: "none",
          borderRadius: 10,
          fontSize: 14,
          fontWeight: 700,
          cursor: checkoutLoading ? "wait" : "pointer",
          fontFamily: "'Sora',sans-serif",
          transition: "background .15s",
          marginBottom: 12,
          opacity: items.length === 0 ? 0.6 : 1,
        }}
      >
        {checkoutLoading ? "Procesando compra..." : "Proceder al pago ->"}
      </button>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 16, borderTop: `1px solid ${tokens.border}` }}>
        {GUARANTEES.map(({ icon, text }) => (
          <div key={text} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: tokens.accentSoft,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                flexShrink: 0,
              }}
            >
              {icon}
            </div>
            <span style={{ fontSize: 12, color: tokens.sub, fontFamily: "'Sora',sans-serif" }}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}