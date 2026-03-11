/* ═══════════════════════════════════════════════════════
   SECTION: PromoterHero
   Location: src/features/qr-landing/sections/PromoterHero.tsx
═══════════════════════════════════════════════════════ */

import type { Promoter, Category, Campaign } from "../types";
import { tokens } from "../theme/tokens";
import { ContactButton } from "../ui/ContactButton";
import { usePageAnimation } from "../hooks/usePageAnimation";

interface PromoterHeroProps {
  promoter: Promoter;
  category: Category;
  campaign: Campaign;
}

export function PromoterHero({ promoter, category, campaign }: PromoterHeroProps) {
  const animateIn = usePageAnimation(100);

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${tokens.accent} 0%, #1D4ED8 100%)`,
        borderRadius: 16,
        overflow: "hidden",
        padding: "clamp(32px, 5vw, 48px)",
        position: "relative",
        boxShadow: "0 8px 40px rgba(30,58,138,0.18)",
        opacity: animateIn ? 1 : 0,
        transform: animateIn ? "translateY(0)" : "translateY(12px)",
        transition: "opacity .5s ease, transform .5s ease",
      }}
    >
      {/* Decorative circles */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }}
      >
        <circle cx="85%" cy="50%" r="180" fill="white" />
        <circle cx="92%" cy="20%" r="100" fill="white" />
      </svg>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Top badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(255,255,255,0.14)",
            backdropFilter: "blur(8px)",
            borderRadius: 8,
            padding: "5px 12px",
            marginBottom: 20,
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1L9 5.5 14 6 10.5 9.5 11.5 14 7 11.5 2.5 14 3.5 9.5 0 6 5 5.5z" fill="white" />
          </svg>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#fff",
              fontFamily: "'Sora',sans-serif",
              letterSpacing: "0.5px",
            }}
          >
            {promoter.badge}
          </span>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, alignItems: "center" }}
        >
          {/* Photo */}
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              border: "3px solid rgba(255,255,255,0.25)",
              overflow: "hidden",
              flexShrink: 0,
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            }}
          >
            <img
              src={promoter.photo}
              alt={promoter.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          {/* Info */}
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                marginBottom: 6,
                fontFamily: "'Sora',sans-serif",
              }}
            >
              Tu asesora personal
            </p>
            <h2
              style={{
                fontSize: "clamp(20px, 3vw, 26px)",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.5px",
                lineHeight: 1.2,
                fontFamily: "'Sora',sans-serif",
                marginBottom: 8,
              }}
            >
              {promoter.name}
            </h2>
            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.75)",
                fontFamily: "'Sora',sans-serif",
                marginBottom: 14,
              }}
            >
              {promoter.role} · {promoter.company}
            </p>

            {/* Contact buttons */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <ContactButton icon="📱" text="Llamar" href={`tel:${promoter.phone}`} />
              <ContactButton icon="✉️" text="Email" href={`mailto:${promoter.email}`} />
              <ContactButton
                icon="💬"
                text="WhatsApp"
                href={`https://wa.me/${promoter.phone.replace(/\D/g, "")}`}
              />
            </div>
          </div>
        </div>

        {/* Category + discount banner */}
        <div
          style={{
            marginTop: 28,
            paddingTop: 28,
            borderTop: "1px solid rgba(255,255,255,0.15)",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 20,
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.6)",
                fontFamily: "'Sora',sans-serif",
                marginBottom: 4,
                fontWeight: 600,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Selección personalizada
            </p>
            <p
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#fff",
                fontFamily: "'Sora',sans-serif",
                letterSpacing: "-0.2px",
              }}
            >
              {category.name}
            </p>
            <p
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.65)",
                fontFamily: "'Sora',sans-serif",
                marginTop: 2,
              }}
            >
              {category.tagline}
            </p>
          </div>

          {/* Discount pill */}
          <div
            style={{
              background: tokens.warn,
              borderRadius: 10,
              padding: "14px 20px",
              textAlign: "center",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            }}
          >
            <p
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: "#fff",
                fontFamily: "'Sora',sans-serif",
                lineHeight: 1,
                letterSpacing: "-0.5px",
              }}
            >
              −{campaign.discount}%
            </p>
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "rgba(255,255,255,0.85)",
                fontFamily: "'Sora',sans-serif",
                marginTop: 3,
                letterSpacing: "0.5px",
              }}
            >
              DESCUENTO
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}