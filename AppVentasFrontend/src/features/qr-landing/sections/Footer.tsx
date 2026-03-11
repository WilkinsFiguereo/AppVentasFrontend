/* ═══════════════════════════════════════════════════════
   SECTION: Footer
   Location: src/features/qr-landing/sections/Footer.tsx
═══════════════════════════════════════════════════════ */

import { tokens } from "../theme/tokens";

interface FooterProps {
  qrId: string;
}

export function Footer({ qrId }: FooterProps) {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "32px 0 24px",
        borderTop: `1px solid ${tokens.border}`,
        marginTop: 48,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <p style={{ fontSize: 12, color: tokens.sub, fontFamily: "'Sora',sans-serif" }}>
          © 2025 NexusStore · Plataforma empresarial de software y servicios
        </p>
        <p
          style={{
            fontSize: 10,
            color: tokens.border,
            fontFamily: "'Sora',monospace",
            letterSpacing: "0.5px",
          }}
        >
          ID de escaneo: {qrId}
        </p>
      </div>
    </footer>
  );
}