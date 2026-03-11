// app/src/features/product-detail/ui/Stars.tsx
"use client";

import { useState } from "react";
import { T } from "../theme/tokens";

export default function Stars({
  r,
  size = 13,
  interactive = false,
  onChange,
}: {
  r: number;
  size?: number;
  interactive?: boolean;
  onChange?: (v: number) => void;
}) {
  const [hover, setHover] = useState(0);
  const display = interactive ? (hover || r) : r;

  return (
    <span style={{ display: "flex", gap: "3px", alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 13 13"
          style={{ cursor: interactive ? "pointer" : "default", flexShrink: 0 }}
          onClick={() => interactive && onChange?.(i)}
          onMouseEnter={() => interactive && setHover(i)}
          onMouseLeave={() => interactive && setHover(0)}
        >
          <polygon
            points="6.5,1 8,4.5 12,4.8 9.3,7.3 10.1,11.2 6.5,9.3 2.9,11.2 3.7,7.3 1,4.8 5,4.5"
            fill={i <= Math.round(display) ? T.warn : T.border}
            style={{ transition: "fill .12s" }}
          />
        </svg>
      ))}
    </span>
  );
}
