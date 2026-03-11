// src/features/home/sections/Cta/CtaBand.tsx
import { T } from "../../theme/tokens";
import Button from "../../ui/Button";

export default function CtaBand() {
  return (
    <div
      style={{
        borderRadius: 14,
        border: `1px solid ${T.border}`,
        background: T.surface,
        padding: "clamp(28px,4vw,44px) clamp(24px,5vw,52px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        flexWrap: "wrap",
      }}
    >
      <div style={{ maxWidth: 440 }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: T.accentMid, marginBottom: 6 }}>Prueba sin riesgo</p>
        <h3 style={{ fontSize: "clamp(17px,2.3vw,24px)", fontWeight: 700, color: T.text, letterSpacing: "-0.4px", marginBottom: 9, lineHeight: 1.25 }}>
          Empieza hoy con 30 días gratis.
        </h3>
        <p style={{ fontSize: 13, color: T.sub, lineHeight: 1.68 }}>Sin tarjeta de crédito. Cancela cuando quieras. Onboarding dedicado incluido en todos los planes.</p>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <Button variant="primary">Comenzar gratis</Button>
        <Button variant="outline">Ver planes</Button>
      </div>
    </div>
  );
}
