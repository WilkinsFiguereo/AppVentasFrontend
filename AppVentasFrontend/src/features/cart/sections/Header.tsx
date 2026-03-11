/* cart header */
import { tokens } from "../theme/tokens";

export function Header() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 200,
        background: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${tokens.border}`,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 32px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a
          href="/navigation/home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            fontWeight: 500,
            color: tokens.sub,
            textDecoration: "none",
            fontFamily: "'Sora',sans-serif",
            transition: "color .15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = tokens.text)}
          onMouseLeave={(e) => (e.currentTarget.style.color = tokens.sub)}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2 4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Seguir comprando
        </a>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 26 26" fill="none">
            <rect x="2" y="2" width="10" height="10" rx="2.5" fill={tokens.accent} />
            <rect x="14" y="2" width="10" height="10" rx="2.5" fill={tokens.accentMid} opacity="0.55" />
            <rect x="2" y="14" width="10" height="10" rx="2.5" fill={tokens.accentMid} opacity="0.55" />
            <rect x="14" y="14" width="10" height="10" rx="2.5" fill={tokens.accent} opacity="0.25" />
          </svg>
          <span style={{ fontSize: 14, fontWeight: 700, color: tokens.text, fontFamily: "'Sora',sans-serif", letterSpacing: "-0.2px" }}>
            Nexus<span style={{ color: tokens.accentMid, fontWeight: 400 }}>Store</span>
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, background: tokens.successBg, borderRadius: 7, padding: "4px 10px" }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <rect x="2" y="5" width="9" height="7" rx="1.5" stroke={tokens.success} strokeWidth="1.2" />
            <path d="M4 5V3.5a2 2 0 014 0V5" stroke={tokens.success} strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 10, fontWeight: 700, color: tokens.success, fontFamily: "'Sora',sans-serif", letterSpacing: "0.3px" }}>
            Pago seguro
          </span>
        </div>
      </div>
    </header>
  );
}
