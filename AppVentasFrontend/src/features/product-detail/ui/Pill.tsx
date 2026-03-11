// app/src/features/product-detail/ui/Pill.tsx
"use client";

import { T } from "../theme/tokens";

export default function Pill({
  children,
  bg = T.accentSoft,
  color = T.accent,
}: {
  children: React.ReactNode;
  bg?: string;
  color?: string;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 10px",
        borderRadius: 6,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.5px",
        textTransform: "uppercase",
        background: bg,
        color,
      }}
    >
      {children}
    </span>
  );
}
