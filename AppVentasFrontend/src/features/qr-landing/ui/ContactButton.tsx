/* ═══════════════════════════════════════════════════════
   UI COMPONENT: ContactButton
   Location: src/features/qr-landing/ui/ContactButton.tsx
═══════════════════════════════════════════════════════ */

import { useState } from "react";

interface ContactButtonProps {
  icon: string;
  text: string;
  href: string;
}

export function ContactButton({ icon, text, href }: ContactButtonProps) {
  const [hover, setHover] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        padding: "7px 14px",
        borderRadius: 8,
        background: hover ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.12)",
        border: "1px solid rgba(255,255,255,0.2)",
        color: "#fff",
        fontSize: 13,
        fontWeight: 600,
        textDecoration: "none",
        fontFamily: "'Sora',sans-serif",
        transition: "background .18s",
      }}
    >
      <span style={{ fontSize: 13 }}>{icon}</span>
      {text}
    </a>
  );
}