// src/features/home/sections/Trust/TrustBar.tsx
import { T } from "../../theme/tokens";

export default function TrustBar() {
  const items = [
    { icon: "🏆", text: "5,000+ empresas" },
    { icon: "⚡", text: "99.9% uptime" },
    { icon: "🔒", text: "ISO 27001" },
    { icon: "↩️", text: "30 días de prueba" },
    { icon: "🌎", text: "Soporte 24/7" },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        gap: 8,
        padding: "14px 28px",
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 10,
      }}
    >
      {items.map(({ icon, text }) => (
        <div key={text} style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ fontSize: 14 }}>{icon}</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: T.sub }}>{text}</span>
        </div>
      ))}
    </div>
  );
}
