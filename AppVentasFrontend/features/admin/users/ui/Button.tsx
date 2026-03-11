"use client";
import React from "react";
import { colors, font, radius } from "../theme/tokens";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size    = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?:    Size;
  loading?: boolean;
  icon?:    React.ReactNode;
}

const VARIANTS: Record<Variant, React.CSSProperties> = {
  primary:   { background: colors.brand[600],    color: "#fff",                 border: "none" },
  secondary: { background: "transparent",        color: colors.brand[600],      border: `1.5px solid ${colors.brand[600]}` },
  ghost:     { background: "transparent",        color: colors.text.secondary,  border: `1.5px solid ${colors.border}` },
  danger:    { background: colors.error.soft,    color: colors.error.DEFAULT,   border: `1.5px solid #FECACA` },
};

const SIZES: Record<Size, React.CSSProperties> = {
  sm: { padding: "6px 13px",  fontSize: font.size.sm },
  md: { padding: "8px 18px",  fontSize: font.size.base },
  lg: { padding: "11px 24px", fontSize: font.size.md },
};

export function Button({
  variant = "primary",
  size    = "md",
  loading = false,
  icon,
  children,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const off = disabled || loading;
  return (
    <button
      {...rest}
      disabled={off}
      style={{
        display:      "inline-flex",
        alignItems:   "center",
        gap:          6,
        borderRadius: radius.md,
        fontWeight:   font.weight.semibold,
        fontFamily:   font.family,
        cursor:       off ? "not-allowed" : "pointer",
        opacity:      off ? 0.55 : 1,
        whiteSpace:   "nowrap",
        transition:   "opacity .15s, background .15s, box-shadow .15s",
        ...VARIANTS[variant],
        ...SIZES[size],
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!off && variant === "primary") {
          e.currentTarget.style.background = colors.brand[700];
          e.currentTarget.style.boxShadow  = `0 4px 14px ${colors.shadow}`;
        }
      }}
      onMouseLeave={(e) => {
        if (!off && variant === "primary") {
          e.currentTarget.style.background = colors.brand[600];
          e.currentTarget.style.boxShadow  = "none";
        }
      }}
    >
      {loading ? <Spinner /> : icon}
      {children}
    </button>
  );
}

function Spinner() {
  return (
    <svg
      width="13" height="13" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
      style={{ animation: "bn-spin .7s linear infinite" }}
    >
      <path d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  );
}