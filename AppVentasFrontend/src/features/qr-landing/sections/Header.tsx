/* ═══════════════════════════════════════════════════════
   SECTION: Header
   Location: src/features/qr-landing/sections/Header.tsx
═══════════════════════════════════════════════════════ */

import { tokens } from "../theme/tokens";

export function Header() {
  return (
    <header
      style={{
        background: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${tokens.border}`,
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 28px",
          height: 58,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <rect x="2" y="2" width="10" height="10" rx="2.5" fill={tokens.accent} />
            <rect
              x="14"
              y="2"
              width="10"
              height="10"
              rx="2.5"
              fill={tokens.accentMid}
              opacity="0.55"
            />
            <rect
              x="2"
              y="14"
              width="10"
              height="10"
              rx="2.5"
              fill={tokens.accentMid}
              opacity="0.55"
            />
            <rect
              x="14"
              y="14"
              width="10"
              height="10"
              rx="2.5"
              fill={tokens.accent}
              opacity="0.25"
            />
          </svg>
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: tokens.text,
              fontFamily: "'Sora',sans-serif",
              letterSpacing: "-0.3px",
            }}
          >
            Nexus<span style={{ color: tokens.accentMid, fontWeight: 400 }}>Store</span>
          </span>
        </div>

        {/* Secure badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            background: tokens.successBg,
            borderRadius: 8,
            padding: "5px 12px",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect
              x="2"
              y="5"
              width="10"
              height="8"
              rx="1.5"
              stroke={tokens.success}
              strokeWidth="1.3"
            />
            <path
              d="M4.5 5V3.5a2.5 2.5 0 015 0V5"
              stroke={tokens.success}
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <circle cx="7" cy="9" r="1" fill={tokens.success} />
          </svg>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: tokens.success,
              fontFamily: "'Sora',sans-serif",
              letterSpacing: "0.3px",
            }}
          >
            Conexión segura
          </span>
        </div>
      </div>
    </header>
  );
}