import React from "react";
import { colors, font, radius } from "../theme/tokens";

interface StatCardProps {
  label:       string;
  value:       string | number;
  icon:        React.ReactNode;
  trend?:      number;
  trendLabel?: string;
  accent?:     string;
  accentSoft?: string;
}

export function StatCard({
  label,
  value,
  icon,
  trend,
  trendLabel,
  accent     = colors.brand[600],
  accentSoft = colors.brand[100],
}: StatCardProps) {
  return (
    <div
      style={{
        background:    colors.bg.secondary,
        border:        `1px solid ${colors.border}`,
        borderRadius:  radius.lg,
        padding:       "20px 22px",
        display:       "flex",
        flexDirection: "column",
        gap:           14,
        transition:    "box-shadow .15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 4px 20px ${colors.shadow}`)}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      {/* Label + icon */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{
          fontSize:      font.size.sm,
          fontWeight:    font.weight.semibold,
          color:         colors.text.secondary,
          letterSpacing: "0.02em",
        }}>
          {label}
        </span>
        <div style={{
          background:   accentSoft,
          color:        accent,
          padding:      7,
          borderRadius: radius.md,
          display:      "flex",
        }}>
          {icon}
        </div>
      </div>

      {/* Value + trend */}
      <div>
        <div style={{
          fontSize:      font.size["2xl"],
          fontWeight:    font.weight.extrabold,
          color:         colors.text.primary,
          lineHeight:    1,
          letterSpacing: "-.03em",
        }}>
          {value}
        </div>
        {trend !== undefined && (
          <div style={{
            marginTop:  6,
            fontSize:   font.size.xs,
            fontWeight: font.weight.semibold,
            color:      trend >= 0 ? colors.success.DEFAULT : colors.error.DEFAULT,
          }}>
            {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%{trendLabel ? ` ${trendLabel}` : ""}
          </div>
        )}
      </div>
    </div>
  );
}