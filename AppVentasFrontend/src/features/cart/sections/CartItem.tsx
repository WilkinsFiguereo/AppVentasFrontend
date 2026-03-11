import { useState } from "react";

import type { CartItem as CartItemType } from "../types";
import { tokens } from "../theme/tokens";
import { QuantityControl } from "../ui/QuantityControl";

interface CartItemProps {
  item: CartItemType;
  onUpdate: (id: number, billingCycle: CartItemType["billingCycle"], updates: Partial<CartItemType>) => void;
  onRemove: (id: number, billingCycle: CartItemType["billingCycle"]) => void;
}

export function CartItem({ item, onUpdate, onRemove }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [users, setUsers] = useState(item.users);

  const updateQuantity = (newQty: number) => {
    setQuantity(newQty);
    onUpdate(item.id, item.billingCycle, { quantity: newQty });
  };

  const updateUsers = (newUsers: number) => {
    setUsers(newUsers);
    onUpdate(item.id, item.billingCycle, { users: newUsers });
  };

  const total = item.price * quantity * users * (item.billingCycle === "annual" ? 12 : 1);

  return (
    <div style={{ background: tokens.surface, borderRadius: 12, border: `1px solid ${tokens.border}`, padding: "20px", display: "flex", gap: 20 }}>
      <div style={{ width: 100, height: 100, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
        <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ fontSize: 10, color: tokens.sub, fontWeight: 600, letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 3, fontFamily: "'Sora',sans-serif" }}>
              {item.category}
            </p>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: tokens.text, fontFamily: "'Sora',sans-serif", marginBottom: 6 }}>
              {item.name}
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 11, color: tokens.sub, fontFamily: "'Sora',sans-serif", padding: "2px 8px", background: tokens.bg, borderRadius: 5 }}>
                {item.billingCycle === "annual" ? "Facturacion anual" : "Facturacion mensual"}
              </span>
            </div>
          </div>

          <button
            onClick={() => onRemove(item.id, item.billingCycle)}
            style={{ background: "transparent", border: "none", cursor: "pointer", color: tokens.sub, padding: 4, borderRadius: 6, transition: "all .15s" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = tokens.dangerBg;
              e.currentTarget.style.color = tokens.danger;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = tokens.sub;
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M5 4V3a2 2 0 012-2h2a2 2 0 012 2v1m1 0v9a2 2 0 01-2 2H6a2 2 0 01-2-2V4h8z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 7v5M10 7v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <QuantityControl label="Licencias" value={quantity} onChange={updateQuantity} />
          <QuantityControl label="Usuarios" value={users} onChange={updateUsers} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 8, borderTop: `1px solid ${tokens.border}` }}>
          <span style={{ fontSize: 12, color: tokens.sub, fontFamily: "'Sora',sans-serif" }}>
            ${item.price}/usuario/mes x {quantity} x {users} usuarios
            {item.billingCycle === "annual" && " x 12 meses"}
          </span>
          <span style={{ fontSize: 18, fontWeight: 800, color: tokens.text, fontFamily: "'Sora',sans-serif", letterSpacing: "-0.4px" }}>
            ${total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
