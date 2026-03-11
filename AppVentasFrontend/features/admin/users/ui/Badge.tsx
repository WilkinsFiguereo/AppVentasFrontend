import React from "react";
import { colors, font, radius } from "../theme/tokens";

// ── Badge ────────────────────────────────────────────────────────────────────
type BadgeVariant = "success" | "error" | "warning" | "info" | "default";

const BADGE_MAP: Record<BadgeVariant, { bg: string; color: string }> = {
  success: { bg: colors.success.soft,  color: colors.success.text },
  error:   { bg: colors.error.soft,    color: colors.error.text   },
  warning: { bg: colors.warning.soft,  color: colors.warning.text },
  info:    { bg: colors.brand[100],    color: colors.brand[700]   },
  default: { bg: colors.bg.alt,        color: colors.text.secondary },
};

interface BadgeProps {
  variant?:  BadgeVariant;
  children:  React.ReactNode;
}

export function Badge({ variant = "default", children }: BadgeProps) {
  const s = BADGE_MAP[variant];
  return (
    <span style={{
      display:       "inline-flex",
      alignItems:    "center",
      padding:       "2px 9px",
      borderRadius:  radius.full,
      fontSize:      font.size.xs,
      fontWeight:    font.weight.bold,
      background:    s.bg,
      color:         s.color,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      whiteSpace:    "nowrap",
    }}>
      {children}
    </span>
  );
}

// ── Avatar ───────────────────────────────────────────────────────────────────
const PALETTE = [
  colors.brand[600], "#0E7490", "#047857",
  "#7C3AED",         "#B45309", "#9D174D",
];

function pickColor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++)
    h = name.charCodeAt(i) + ((h << 5) - h);
  return PALETTE[Math.abs(h) % PALETTE.length];
}

interface AvatarProps {
  name: string;
  size?: number;
}

export function Avatar({ name, size = 34 }: AvatarProps) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div style={{
      width:          size,
      height:         size,
      borderRadius:   "50%",
      background:     pickColor(name),
      color:          "#fff",
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      fontSize:       size * 0.34,
      fontWeight:     font.weight.bold,
      flexShrink:     0,
      letterSpacing:  "0.04em",
    }}>
      {initials}
    </div>
  );
}