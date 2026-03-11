// src/features/home/ui/Button.tsx
"use client";

import { useState } from "react";
import { T } from "../theme/tokens";

type Variant = "white" | "ghost" | "primary" | "outline";

export default function Button({
  variant = "primary",
  children,
  onClick,
  style = {},
}: {
  variant?: Variant;
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  const [h, setH] = useState(false);

  const map =
    {
      white: { bg: h ? "#f0f4f8" : "#fff", color: T.accent, border: "none" },
      ghost: { bg: h ? "rgba(255,255,255,0.12)" : "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.28)" },
      primary: { bg: h ? "#1D4ED8" : T.accent, color: "#fff", border: "none" },
      outline: { bg: h ? T.accentSoft : "transparent", color: T.accent, border: `1px solid ${T.border}` },
    }[variant] || {};

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        padding: "10px 20px",
        borderRadius: 9,
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        transition: "all .18s ease",
        background: map.bg,
        color: map.color,
        border: map.border,
        letterSpacing: "0.1px",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
