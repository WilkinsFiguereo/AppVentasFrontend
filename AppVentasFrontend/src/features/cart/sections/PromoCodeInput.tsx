import { useState } from "react";

import type { PromoCode } from "../types";
import { tokens } from "../theme/tokens";
import { PROMO_CODES } from "../data/mockData";

interface PromoCodeInputProps {
  onApply: (promo: PromoCode | null) => void;
}

export function PromoCodeInput({ onApply }: PromoCodeInputProps) {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleApply = () => {
    const upperCode = code.toUpperCase().trim();
    if (PROMO_CODES[upperCode]) {
      setApplied(upperCode);
      setError("");
      onApply(PROMO_CODES[upperCode]);
    } else {
      setError("Codigo invalido");
      setApplied(null);
    }
  };

  const handleRemove = () => {
    setApplied(null);
    setCode("");
    setError("");
    onApply(null);
  };

  return (
    <div style={{ background: tokens.surface, borderRadius: 12, border: `1px solid ${tokens.border}`, padding: "20px" }}>
      <h3 style={{ fontSize: 14, fontWeight: 700, color: tokens.text, fontFamily: "'Sora',sans-serif", marginBottom: 14 }}>
        Tienes un codigo promocional?
      </h3>

      {applied ? (
        <div style={{ background: tokens.successBg, border: `1px solid ${tokens.success}`, borderRadius: 9, padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" fill={tokens.success} />
              <path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: tokens.success, fontFamily: "'Sora',sans-serif" }}>
                Codigo aplicado: {applied}
              </p>
              <p style={{ fontSize: 11, color: tokens.success, fontFamily: "'Sora',sans-serif", opacity: 0.8 }}>
                {PROMO_CODES[applied]?.description}
              </p>
            </div>
          </div>
          <button
            onClick={handleRemove}
            style={{ background: "transparent", border: "none", cursor: "pointer", color: tokens.success, fontSize: 11, fontWeight: 600, fontFamily: "'Sora',sans-serif", textDecoration: "underline" }}
          >
            Remover
          </button>
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleApply()}
              placeholder="Ingresa tu codigo"
              style={{
                flex: 1,
                padding: "10px 14px",
                border: `1px solid ${error ? tokens.danger : tokens.border}`,
                borderRadius: 9,
                fontSize: 13,
                color: tokens.text,
                background: tokens.bg,
                fontFamily: "'Sora',sans-serif",
                outline: "none",
                transition: "border-color .15s",
              }}
              onFocus={(e) => {
                if (!error) e.currentTarget.style.borderColor = tokens.accentMid;
              }}
              onBlur={(e) => {
                if (!error) e.currentTarget.style.borderColor = tokens.border;
              }}
            />
            <button
              onClick={handleApply}
              style={{ padding: "10px 20px", borderRadius: 9, background: tokens.accent, color: "#fff", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Sora',sans-serif", transition: "background .15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#1D4ED8")}
              onMouseLeave={(e) => (e.currentTarget.style.background = tokens.accent)}
            >
              Aplicar
            </button>
          </div>
          {error && <p style={{ fontSize: 11, color: tokens.danger, marginTop: 8, fontFamily: "'Sora',sans-serif" }}>{error}</p>}
        </div>
      )}
    </div>
  );
}
