// src/features/home/ui/IconButton.tsx
"use client";

import { useState } from "react";
import { T } from "../theme/tokens";

export default function IconButton({
  icon,
  badge,
  onClick,
  title,
}: {
  icon: React.ReactNode;
  badge?: number;
  onClick?: () => void;
  title?: string;
}) {
  const [h, setH] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        position: "relative",
        width: 36,
        height: 36,
        borderRadius: 8,
        border: `1px solid ${h ? T.border : "transparent"}`,
        background: h ? T.bg : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all .15s",
      }}
    >
      {icon}
      {(badge || 0) > 0 ? (
        <span
          style={{
            position: "absolute",
            top: 3,
            right: 3,
            width: 15,
            height: 15,
            borderRadius: "50%",
            background: T.accentMid,
            color: "#fff",
            fontSize: 8,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {badge}
        </span>
      ) : null}
    </button>
  );
}