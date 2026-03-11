// app/src/features/home/sections/Services/ServicesSection.tsx
"use client";

import { useState } from "react";

import { T } from "../../theme/tokens";
import SectionHeading from "../../ui/SectionHeading";
import type { Service } from "../../types/home.types";

function ServiceProductCard({ s }: { s: Service }) {
  const [hovered, setHovered] = useState(false);

  const badgeMap: Record<string, { bg: string; color: string }> = {
    Premium: { bg: "#EDE9FE", color: "#4C1D95" },
    Rapido: { bg: "#DBEAFE", color: "#1E40AF" },
    Recomendado: { bg: "#D1FAE5", color: "#065F46" },
    Oferta: { bg: "#FEE2E2", color: "#991B1B" },
  };

  const badgeColor = s.badge ? badgeMap[s.badge] || { bg: "#DBEAFE", color: "#1E40AF" } : null;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: T.surface,
        borderRadius: 12,
        border: `1px solid ${hovered ? "#CBD5E1" : T.border}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "all .22s ease",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? T.shadowMd : T.shadowSm,
      }}
    >
      <div style={{ position: "relative", height: 162, overflow: "hidden" }}>
        <img
          src={s.img}
          alt={s.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform .4s ease",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(15,23,42,0.14)",
            opacity: hovered ? 1 : 0,
            transition: "opacity .22s",
          }}
        />

        {s.badge && badgeColor && (
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
              background: badgeColor.bg,
              color: badgeColor.color,
            }}
          >
            {s.badge}
          </span>
        )}
      </div>

      <div style={{ padding: "14px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <span
          style={{
            fontSize: 10,
            color: T.sub,
            fontWeight: 600,
            letterSpacing: "0.9px",
            textTransform: "uppercase",
            fontFamily: "'Sora',sans-serif",
          }}
        >
          Servicios
        </span>

        <h3 style={{ fontSize: 14, fontWeight: 800, color: T.text, lineHeight: 1.3, fontFamily: "'Sora',sans-serif" }}>
          {s.title}
        </h3>

        <p style={{ fontSize: 13, color: T.sub, lineHeight: 1.7, fontFamily: "'Sora',sans-serif" }}>
          {s.desc}
        </p>

        <div style={{ marginTop: "auto" }} />
      </div>

      <div style={{ padding: "0 16px 14px" }}>
        <button
          style={{
            width: "100%",
            padding: "9px 0",
            background: hovered ? T.accent : "transparent",
            color: hovered ? "#fff" : T.accentMid,
            border: `1px solid ${hovered ? T.accent : T.border}`,
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            transition: "all .18s ease",
            fontFamily: "'Sora',sans-serif",
          }}
        >
          {hovered ? "Solicitar servicio" : "Ver servicio"}
        </button>
      </div>
    </div>
  );
}

type ServicesSectionProps = {
  services: Service[];
  loading?: boolean;
  error?: string | null;
};

export default function ServicesSection({ services, loading = false, error = null }: ServicesSectionProps) {
  return (
    <section>
      <SectionHeading label="Servicios" title="Acompanamiento y soporte" showAll />

      {error && !loading ? (
        <p style={{ marginBottom: 12, color: "#B91C1C", fontSize: 13, fontWeight: 600 }}>{error}</p>
      ) : null}

      {loading ? (
        <p style={{ fontSize: 13, color: T.sub }}>Cargando servicios...</p>
      ) : services.length === 0 ? (
        <p style={{ fontSize: 13, color: T.sub }}>No hay servicios disponibles.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
            gap: 16,
          }}
        >
          {services.map((service) => (
            <ServiceProductCard key={service.id} s={service} />
          ))}
        </div>
      )}
    </section>
  );
}
