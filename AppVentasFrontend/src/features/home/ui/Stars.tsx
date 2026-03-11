// src/features/home/ui/Stars.tsx
import { T } from "../theme/tokens";

export default function Stars({ r }: { r: number }) {
  return (
    <span style={{ display: "flex", gap: "2px", alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 11 11">
          <polygon
            points="5.5,1 6.9,4 10,4.3 7.7,6.4 8.4,9.5 5.5,7.9 2.6,9.5 3.3,6.4 1,4.3 4.1,4"
            fill={i <= Math.round(r) ? T.warn : T.border}
          />
        </svg>
      ))}
    </span>
  );
}
