/* ═══════════════════════════════════════════════════════
   UI COMPONENT: Button (Primary & Outline)
   Location: src/features/qr-landing/ui/Button.tsx
═══════════════════════════════════════════════════════ */

import { useState } from "react";
import { tokens } from "../theme/tokens";

interface ButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "outline";
}

export function Button({ children, href, variant = "primary" }: ButtonProps) {
  const [hover, setHover] = useState(false);

  const styles = {
    primary: {
      background: hover ? "#1D4ED8" : tokens.accent,
      color: "#fff",
      border: "none",
    },
    outline: {
      background: hover ? tokens.accentSoft : "transparent",
      color: tokens.accent,
      border: `1px solid ${tokens.border}`,
    },
  }[variant];

  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px 24px",
        borderRadius: 9,
        fontSize: 14,
        fontWeight: 600,
        textDecoration: "none",
        fontFamily: "'Sora',sans-serif",
        transition: "all .18s",
        ...styles,
      }}
    >
      {children}
    </a>
  );
}