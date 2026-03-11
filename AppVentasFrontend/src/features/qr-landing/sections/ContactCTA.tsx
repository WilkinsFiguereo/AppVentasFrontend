/* ═══════════════════════════════════════════════════════
   SECTION: ContactCTA
   Location: src/features/qr-landing/sections/ContactCTA.tsx
═══════════════════════════════════════════════════════ */

import type { Promoter } from "../types";
import { tokens } from "../theme/tokens";
import { Button } from "../ui/Button";

interface ContactCTAProps {
  promoter: Promoter;
}

export function ContactCTA({ promoter }: ContactCTAProps) {
  return (
    <section
      style={{
        marginTop: 48,
        background: tokens.surface,
        border: `1px solid ${tokens.border}`,
        borderRadius: 14,
        padding: "36px 32px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: tokens.accentSoft,
          margin: "0 auto 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
        }}
      >
        💬
      </div>
      <h3
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: tokens.text,
          fontFamily: "'Sora',sans-serif",
          marginBottom: 8,
          letterSpacing: "-0.3px",
        }}
      >
        ¿Tienes dudas?
      </h3>
      <p
        style={{
          fontSize: 14,
          color: tokens.sub,
          marginBottom: 24,
          fontFamily: "'Sora',sans-serif",
          lineHeight: 1.6,
          maxWidth: 480,
          margin: "0 auto 24px",
        }}
      >
        {promoter.name} está lista para ayudarte a elegir la mejor solución para tu negocio.
        Contáctala directamente y recibe asesoría personalizada sin costo.
      </p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        <Button href={`tel:${promoter.phone}`} variant="primary">
          Llamar ahora
        </Button>
        <Button
          href={`https://wa.me/${promoter.phone.replace(/\D/g, "")}`}
          variant="outline"
        >
          WhatsApp
        </Button>
      </div>
    </section>
  );
}