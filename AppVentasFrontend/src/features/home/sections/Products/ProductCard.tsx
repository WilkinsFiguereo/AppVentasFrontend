// src/features/home/sections/Products/ProductCard.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { T } from "../../theme/tokens";
import Stars from "../../ui/Stars";
import type { Product } from "../../types/home.types";

export default function ProductCard({ p }: { p: Product }) {
  const router = useRouter();

  const [h, setH] = useState(false);

  const badgeMap: Record<string, { bg: string; color: string }> = {
    "Más vendido": { bg: "#D1FAE5", color: "#065F46" },
    "Mas vendido": { bg: "#D1FAE5", color: "#065F46" },
    Nuevo: { bg: "#DBEAFE", color: "#1E40AF" },
    Oferta: { bg: "#FEE2E2", color: "#991B1B" },
    Popular: { bg: "#FEF3C7", color: "#92400E" },
    Premium: { bg: "#EDE9FE", color: "#4C1D95" },
  };
  const bc = p.badge ? badgeMap[p.badge] : undefined;

  const goToDetail = () => {
    router.push(`/navigation/products/${p.id}`);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={goToDetail}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") goToDetail();
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: T.surface,
        borderRadius: 12,
        border: `1px solid ${h ? "#CBD5E1" : T.border}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "all .22s ease",
        transform: h ? "translateY(-2px)" : "none",
        boxShadow: h ? T.shadowMd : T.shadowSm,
        cursor: "pointer",
        outline: "none",
      }}
    >
      <div style={{ position: "relative", height: 162, overflow: "hidden" }}>
        <img
          src={p.img}
          alt={p.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform .4s ease",
            transform: h ? "scale(1.04)" : "scale(1)",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(15,23,42,0.16)",
            opacity: h ? 1 : 0,
            transition: "opacity .22s",
          }}
        />

        {p.badge && bc ? (
          <span
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              padding: "3px 8px",
              borderRadius: 6,
              background: bc.bg,
              color: bc.color,
            }}
          >
            {p.badge}
          </span>
        ) : null}

      </div>

      <div style={{ padding: "14px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{ fontSize: 10, color: T.sub, fontWeight: 600, letterSpacing: "0.9px", textTransform: "uppercase" }}>
          {p.cat}
        </span>

        <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, lineHeight: 1.3 }}>{p.name}</h3>

        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Stars r={p.rating} />
          <span style={{ fontSize: 11, color: T.sub }}>
            {p.rating} - {p.reviews.toLocaleString()}
          </span>
        </div>

        <div style={{ marginTop: "auto", paddingTop: 8, display: "flex", alignItems: "baseline", gap: 7 }}>
          <span style={{ fontSize: 19, fontWeight: 700, color: T.text, letterSpacing: "-0.3px" }}>
            ${p.price}
            <span style={{ fontSize: 11, fontWeight: 500, color: T.sub }}></span>
          </span>

        </div>
      </div>
    </div>
  );
}
