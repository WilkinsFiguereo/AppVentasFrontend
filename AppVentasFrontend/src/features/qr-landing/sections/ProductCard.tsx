/* ═══════════════════════════════════════════════════════
   SECTION: ProductCard
   Location: src/features/qr-landing/sections/ProductCard.tsx
═══════════════════════════════════════════════════════ */

import { useState } from "react";
import type { Product } from "../types";
import { tokens } from "../theme/tokens";
import { Stars } from "../ui/Stars";

interface ProductCardProps {
  product: Product;
  isHighlighted?: boolean;
}

export function ProductCard({ product, isHighlighted = false }: ProductCardProps) {
  const [hover, setHover] = useState(false);
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  const badgeColors: Record<string, { bg: string; color: string }> = {
    Recomendado: { bg: "#FEF3C7", color: "#92400E" },
    Nuevo: { bg: "#DBEAFE", color: "#1E40AF" },
    Oferta: { bg: "#FEE2E2", color: "#991B1B" },
    Popular: { bg: tokens.successBg, color: tokens.success },
  };

  const badgeStyle = product.badge ? badgeColors[product.badge] : undefined;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: tokens.surface,
        borderRadius: 12,
        border: isHighlighted
          ? `2px solid ${tokens.accentMid}`
          : `1px solid ${hover ? tokens.borderMid : tokens.border}`,
        overflow: "hidden",
        transition: "all .25s ease",
        transform: hover ? "translateY(-2px)" : "none",
        boxShadow: isHighlighted
          ? "0 8px 32px rgba(59,130,246,0.15)"
          : hover
          ? "0 8px 28px rgba(15,23,42,0.1)"
          : "0 1px 3px rgba(15,23,42,0.04)",
        position: "relative",
      }}
    >
      {/* Highlighted ribbon */}
      {isHighlighted && (
        <div
          style={{
            position: "absolute",
            top: 12,
            left: -32,
            zIndex: 2,
            background: tokens.accentMid,
            color: "#fff",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "1px",
            padding: "4px 40px",
            transform: "rotate(-45deg)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            fontFamily: "'Sora',sans-serif",
          }}
        >
          ⭐ ELEGIDO
        </div>
      )}

      {/* Image */}
      <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
        <img
          src={product.img}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform .4s ease",
            transform: hover ? "scale(1.05)" : "scale(1)",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(15,23,42,0.18)",
            opacity: hover ? 1 : 0,
            transition: "opacity .25s",
          }}
        />

        {product.badge && badgeStyle && (
          <span
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              padding: "3px 9px",
              borderRadius: 6,
              ...badgeStyle,
            }}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "18px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontSize: 10,
                color: tokens.sub,
                fontWeight: 600,
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                marginBottom: 4,
                fontFamily: "'Sora',sans-serif",
              }}
            >
              {product.category}
            </p>
            <h3
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: tokens.text,
                fontFamily: "'Sora',sans-serif",
                lineHeight: 1.3,
              }}
            >
              {product.name}
            </h3>
          </div>
        </div>

        <p
          style={{
            fontSize: 12,
            color: tokens.sub,
            lineHeight: 1.6,
            fontFamily: "'Sora',sans-serif",
            marginBottom: 12,
          }}
        >
          {product.desc}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
          <Stars rating={product.rating} size={12} />
          <span style={{ fontSize: 11, color: tokens.sub, fontFamily: "'Sora',sans-serif" }}>
            {product.rating} · {product.reviews.toLocaleString()}
          </span>
        </div>

        {/* Price */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 14 }}>
          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: tokens.text,
              fontFamily: "'Sora',sans-serif",
              letterSpacing: "-0.5px",
            }}
          >
            ${product.price}
            <span style={{ fontSize: 12, fontWeight: 500, color: tokens.sub }}></span>
          </span>
          {product.oldPrice && (
            <>
              <span
                style={{
                  fontSize: 13,
                  color: tokens.sub,
                  textDecoration: "line-through",
                  fontFamily: "'Sora',sans-serif",
                }}
              >
                ${product.oldPrice}
              </span>
              {discount && (
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: tokens.success,
                    background: tokens.successBg,
                    padding: "2px 6px",
                    borderRadius: 5,
                  }}
                >
                  −{discount}%
                </span>
              )}
            </>
          )}
        </div>

        {/* CTA */}
        <button
          style={{
            width: "100%",
            padding: "11px 0",
            background: hover ? tokens.accent : "transparent",
            color: hover ? "#fff" : tokens.accentMid,
            border: `1.5px solid ${hover ? tokens.accent : tokens.border}`,
            borderRadius: 9,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all .2s ease",
            fontFamily: "'Sora',sans-serif",
          }}
        >
          {hover ? "Ver producto →" : "Más información"}
        </button>
      </div>
    </div>
  );
}