// src/features/home/ui/SectionHeading.tsx
import { T } from "../theme/tokens";

export default function SectionHeading({
  label,
  title,
  showAll,
}: {
  label: string;
  title: string;
  showAll?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 22 }}>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2.2px", textTransform: "uppercase", color: T.accentMid, marginBottom: 4 }}>
          {label}
        </p>
        <h2 style={{ fontSize: "clamp(17px,2.2vw,22px)", fontWeight: 700, color: T.text, letterSpacing: "-0.4px" }}>{title}</h2>
      </div>

      {showAll ? (
        <a href="#" style={{ fontSize: 12, fontWeight: 600, color: T.accentMid, textDecoration: "none", display: "flex", alignItems: "center", gap: 3 }}>
          Ver todo
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M6 2l4 4-4 4" stroke={T.accentMid} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      ) : null}
    </div>
  );
}
