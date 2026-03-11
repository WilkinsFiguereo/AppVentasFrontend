/* ═══════════════════════════════════════════════════════
   UI COMPONENT: QuantityControl
   Location: src/features/cart/ui/QuantityControl.tsx
   
   Control reutilizable de + / - para cantidades
═══════════════════════════════════════════════════════ */

import { tokens } from "../theme/tokens";

interface QuantityControlProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
}

export function QuantityControl({ label, value, onChange, min = 1 }: QuantityControlProps) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    onChange(value + 1);
  };

  return (
    <div>
      <label
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "1px",
          textTransform: "uppercase",
          color: tokens.sub,
          display: "block",
          marginBottom: 6,
          fontFamily: "'Sora',sans-serif",
        }}
      >
        {label}
      </label>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          background: tokens.bg,
          border: `1px solid ${tokens.border}`,
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <button
          onClick={handleDecrement}
          disabled={value <= min}
          style={{
            width: 32,
            height: 32,
            border: "none",
            background: "transparent",
            cursor: value > min ? "pointer" : "not-allowed",
            fontSize: 14,
            color: value > min ? tokens.sub : tokens.border,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          −
        </button>
        <span
          style={{
            minWidth: 32,
            textAlign: "center",
            fontSize: 13,
            fontWeight: 700,
            color: tokens.text,
            fontFamily: "'Sora',sans-serif",
          }}
        >
          {value}
        </span>
        <button
          onClick={handleIncrement}
          style={{
            width: 32,
            height: 32,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: 14,
            color: tokens.sub,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}