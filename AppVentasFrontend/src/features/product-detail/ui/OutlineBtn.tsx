// app/src/features/product-detail/ui/OutlineBtn.tsx
"use client";

import { useState } from "react";
import { T } from "../theme/tokens";

export default function OutlineBtn({
  children,
  onClick,
  fullWidth,
  size = "md",
  active,
  icon,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
  size?: "md" | "lg";
  active?: boolean;
  icon?: React.ReactNode;
}) {
  const [h, setH] = useState(false);
  const pad = size === "lg" ? "14px 28px" : "10px 20px";
  const fs = size === "lg" ? 14 : 13;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        width: fullWidth ? "100%" : undefined,
        padding: pad,
        borderRadius: 9,
        background: active ? T.accentSoft : h ? T.accentSoft : "transparent",
        color: active ? T.accent : h ? T.accent : T.sub,
        border: `1px solid ${active ? T.accentMid : h ? T.accentMid : T.border}`,
        fontSize: fs,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "'Sora',sans-serif",
        letterSpacing: "0.1px",
        transition: "all .18s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
      }}
    >
      {icon}
      {children}
    </button>
  );
}
