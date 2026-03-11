/* ═══════════════════════════════════════════════════════
   SECTION: TrustBadges
   Location: src/features/qr-landing/sections/TrustBadges.tsx
═══════════════════════════════════════════════════════ */

import { tokens } from "../theme/tokens";

const TRUST_ITEMS = [
  { icon: "✓", text: "Pago 100% seguro" },
  { icon: "↩️", text: "30 días de garantía" },
  { icon: "🚀", text: "Activación inmediata" },
  { icon: "🎯", text: "Soporte dedicado" },
];

export function TrustBadges() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 14,
      }}
    >
      {TRUST_ITEMS.map(({ icon, text }) => (
        <div
          key={text}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "14px 18px",
            background: tokens.surface,
            border: `1px solid ${tokens.border}`,
            borderRadius: 10,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: tokens.accentSoft,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: tokens.text,
              fontFamily: "'Sora',sans-serif",
            }}
          >
            {text}
          </span>
        </div>
      ))}
    </div>
  );
}