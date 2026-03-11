/* ═══════════════════════════════════════════════════════
   SECTION: ProgressSteps
   Location: src/features/cart/sections/ProgressSteps.tsx
   
   Indicador de progreso del checkout (3 pasos)
═══════════════════════════════════════════════════════ */

import { tokens } from "../theme/tokens";

interface ProgressStepsProps {
  current: number; // 0, 1, or 2
}

const STEPS = ["Carrito", "Información", "Pago"];

export function ProgressSteps({ current }: ProgressStepsProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginBottom: 36,
      }}
    >
      {STEPS.map((step, i) => (
        <div key={step} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Step number */}
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: i <= current ? tokens.accent : tokens.bg,
                color: i <= current ? "#fff" : tokens.sub,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                fontFamily: "'Sora',sans-serif",
                border: `1.5px solid ${i <= current ? tokens.accent : tokens.border}`,
                transition: "all .3s",
              }}
            >
              {i + 1}
            </div>

            {/* Step label */}
            <span
              style={{
                fontSize: 13,
                fontWeight: i === current ? 600 : 500,
                color: i <= current ? tokens.text : tokens.sub,
                fontFamily: "'Sora',sans-serif",
              }}
            >
              {step}
            </span>
          </div>

          {/* Connector line */}
          {i < STEPS.length - 1 && (
            <div
              style={{
                width: 40,
                height: 2,
                background: i < current ? tokens.accent : tokens.border,
                borderRadius: 2,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}