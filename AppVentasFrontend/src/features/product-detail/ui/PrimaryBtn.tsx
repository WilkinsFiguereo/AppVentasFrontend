// app/src/features/product-detail/ui/PrimaryBtn.tsx
"use client";

import { useState } from "react";
import { T } from "../theme/tokens";

export default function PrimaryBtn({
  children,
  onClick,
  disabled,
  fullWidth,
  size = "md",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: "md" | "lg";
}) {
  const [h, setH] = useState(false);
  const pad = size === "lg" ? "14px 28px" : "10px 20px";
  const fs = size === "lg" ? 14 : 13;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        width: fullWidth ? "100%" : undefined,
        padding: pad,
        borderRadius: 9,
        background: disabled ? T.border : h ? "#1D4ED8" : T.accent,
        color: disabled ? T.sub : "#fff",
        border: "none",
        fontSize: fs,
        fontWeight: 600,
        cursor: disabled ? "default" : "pointer",
        fontFamily: "'Sora',sans-serif",
        letterSpacing: "0.1px",
        transition: "background .18s",
      }}
    >
      {children}
    </button>
  );
}
