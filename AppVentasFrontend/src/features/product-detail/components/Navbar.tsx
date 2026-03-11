// app/src/features/product-detail/components/Navbar.tsx
"use client";

import { useState } from "react";
import { T } from "../theme/tokens";

function NavIconBtn({ children, badge }: { children: React.ReactNode; badge: number }) {
  const [h, setH] = useState(false);

  return (
    <button
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        position: "relative",
        width: 36,
        height: 36,
        borderRadius: 8,
        border: `1px solid ${h ? T.border : "transparent"}`,
        background: h ? T.bg : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all .15s",
      }}
    >
      {children}
      {badge > 0 && (
        <span
          style={{
            position: "absolute",
            top: 3,
            right: 3,
            width: 15,
            height: 15,
            borderRadius: "50%",
            background: T.accentMid,
            color: "#fff",
            fontSize: 8,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

export default function Navbar({
  saved,
  cart,
  category = "Producto",
  productName = "Detalle",
}: {
  saved: number;
  cart: number;
  category?: string;
  productName?: string;
}) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 300,
        background: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${T.border}`,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", height: 58, display: "flex", alignItems: "center", gap: 16 }}>
        <a
          href="/navigation/home"
          style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: T.sub, textDecoration: "none", fontFamily: "'Sora',sans-serif", transition: "color .15s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = T.text)}
          onMouseLeave={(e) => (e.currentTarget.style.color = T.sub)}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2 4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Volver a productos
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: T.sub, fontFamily: "'Sora',sans-serif" }}>
          <span style={{ color: T.border }}>-</span>
          <span>{category}</span>
          <span style={{ color: T.border }}>{">"}</span>
          <span style={{ color: T.text, fontWeight: 600 }}>{productName}</span>
        </div>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 9 }}>
          <svg width="24" height="24" viewBox="0 0 26 26" fill="none">
            <rect x="2" y="2" width="10" height="10" rx="2.5" fill={T.accent} />
            <rect x="14" y="2" width="10" height="10" rx="2.5" fill={T.accentMid} opacity="0.55" />
            <rect x="2" y="14" width="10" height="10" rx="2.5" fill={T.accentMid} opacity="0.55" />
            <rect x="14" y="14" width="10" height="10" rx="2.5" fill={T.accent} opacity="0.25" />
          </svg>
          <span style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: "'Sora',sans-serif", letterSpacing: "-0.2px" }}>
            Nexus<span style={{ color: T.accentMid, fontWeight: 400 }}>Store</span>
          </span>
        </div>

        <div style={{ display: "flex", gap: 6, marginLeft: 24 }}>
          <NavIconBtn badge={saved}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M3 2h9a1 1 0 011 1v10l-5.5-3L2 13V3a1 1 0 011-1z" stroke={T.sub} strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
          </NavIconBtn>
          <NavIconBtn badge={cart}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M1 1h2L5 9h7l2-5H4" stroke={T.sub} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="7" cy="12" r="1.5" fill={T.sub} />
              <circle cx="12" cy="12" r="1.5" fill={T.sub} />
            </svg>
          </NavIconBtn>
        </div>
      </div>
    </header>
  );
}