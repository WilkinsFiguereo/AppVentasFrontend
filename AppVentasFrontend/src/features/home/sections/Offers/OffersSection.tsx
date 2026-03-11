// app/src/features/home/sections/Offers/OffersSection.tsx
"use client";

import { useState } from "react";
import { T } from "../../theme/tokens";
import SectionHeading from "../../ui/SectionHeading";
import Stars from "../../ui/Stars";
import type { Product } from "../../types/home.types";

function OfferCard({ p }: { p: Product }) {
  const [h, setH] = useState(false);
  const disc = p.old ? Math.round((1 - p.price / p.old) * 100) : null;

  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: T.surface,
        borderRadius: 12,
        border: `1px solid ${h ? "#CBD5E1" : T.border}`,
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "160px 1fr",
        gap: 0,
        transition: "all .22s ease",
        transform: h ? "translateY(-2px)" : "none",
        boxShadow: h ? T.shadowMd : T.shadowSm,
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "100%" }}>
        <img
          src={p.img}
          alt={p.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(15,23,42,0.14)",
            opacity: h ? 1 : 0,
            transition: "opacity .2s",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            padding: "3px 8px",
            borderRadius: 6,
            background: "#FEE2E2",
            color: "#991B1B",
          }}
        >
          Oferta
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 10, color: T.sub, fontWeight: 600, letterSpacing: "0.9px", textTransform: "uppercase" }}>
          {p.cat}
        </span>

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: T.text, lineHeight: 1.3 }}>{p.name}</h3>

          {disc ? (
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                color: T.success,
                background: "#D1FAE5",
                padding: "2px 6px",
                borderRadius: 6,
                whiteSpace: "nowrap",
              }}
            >
              −{disc}%
            </span>
          ) : null}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Stars r={p.rating} />
          <span style={{ fontSize: 11, color: T.sub }}>
            {p.rating} · {p.reviews.toLocaleString()}
          </span>
        </div>

        <div style={{ marginTop: "auto", paddingTop: 6, display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 20, fontWeight: 900, color: T.text, letterSpacing: "-0.3px" }}>
            ${p.price}
            <span style={{ fontSize: 11, fontWeight: 600, color: T.sub }}>/mes</span>
          </span>

          {p.old ? <span style={{ fontSize: 12, color: T.sub, textDecoration: "line-through" }}>${p.old}</span> : null}
        </div>

        <button
          style={{
            marginTop: 10,
            width: "100%",
            padding: "9px 0",
            background: h ? T.accent : "transparent",
            color: h ? "#fff" : T.accentMid,
            border: `1px solid ${h ? T.accent : T.border}`,
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            transition: "all .18s ease",
          }}
        >
          {h ? "Aplicar oferta" : "Ver oferta"}
        </button>
      </div>
    </div>
  );
}

export default function OffersSection({ products }: { products: Product[] }) {
  const offers = products
    .filter((p) => p.old && p.old > p.price)
    .slice(0, 4);

  return (
    <section>
        <br/>
      <SectionHeading label="Ahorra" title="Ofertas destacadas" showAll />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
          gap: 16,
        }}
      >
        {offers.map((p) => (
          <OfferCard key={p.id} p={{ ...p, badge: "Oferta" }} />
        ))}
      </div>
    </section>
  );
}
