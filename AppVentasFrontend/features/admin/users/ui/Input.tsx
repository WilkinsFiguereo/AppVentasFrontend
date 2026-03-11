"use client";
import React, { useState } from "react";
import { colors, font, radius } from "../theme/tokens";

// ── Input ────────────────────────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?:  React.ReactNode;
}

export function Input({ label, error, icon, style, ...rest }: InputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {label && (
        <label style={{
          fontSize:      font.size.sm,
          fontWeight:    font.weight.semibold,
          color:         colors.text.secondary,
          letterSpacing: "0.02em",
        }}>
          {label}
        </label>
      )}

      <div style={{ position: "relative" }}>
        {icon && (
          <span style={{
            position:   "absolute",
            left:       10,
            top:        "50%",
            transform:  "translateY(-50%)",
            color:      colors.text.disabled,
            display:    "flex",
            alignItems: "center",
          }}>
            {icon}
          </span>
        )}
        <input
          {...rest}
          onFocus={(e) => { setFocused(true);  rest.onFocus?.(e); }}
          onBlur={(e)  => { setFocused(false); rest.onBlur?.(e);  }}
          style={{
            width:        "100%",
            padding:      icon ? "9px 12px 9px 34px" : "9px 12px",
            border:       `1.5px solid ${
              error    ? colors.error.DEFAULT :
              focused  ? colors.brand[400]    :
              colors.border
            }`,
            borderRadius: radius.md,
            fontSize:     font.size.base,
            color:        colors.text.primary,
            background:   rest.disabled ? colors.bg.alt : colors.bg.secondary,
            outline:      "none",
            boxSizing:    "border-box",
            fontFamily:   font.family,
            transition:   "border-color .15s, box-shadow .15s",
            boxShadow:    focused ? `0 0 0 3px ${colors.brand[100]}` : "none",
            ...style,
          }}
        />
      </div>

      {error && (
        <span style={{ fontSize: font.size.xs, color: colors.error.DEFAULT }}>
          {error}
        </span>
      )}
    </div>
  );
}

// ── Toggle ───────────────────────────────────────────────────────────────────
interface ToggleProps {
  label:    string;
  checked:  boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}

export function Toggle({ label, checked, onChange, disabled }: ToggleProps) {
  return (
    <label style={{
      display:    "flex",
      alignItems: "center",
      gap:        10,
      cursor:     disabled ? "not-allowed" : "pointer",
      userSelect: "none",
      opacity:    disabled ? 0.5 : 1,
    }}>
      <div
        onClick={() => !disabled && onChange(!checked)}
        style={{
          width:        38,
          height:       21,
          borderRadius: 11,
          background:   checked ? colors.brand[600] : colors.border,
          position:     "relative",
          transition:   "background .2s",
          flexShrink:   0,
        }}
      >
        <div style={{
          width:        15,
          height:       15,
          borderRadius: "50%",
          background:   "#fff",
          position:     "absolute",
          top:          3,
          left:         checked ? 20 : 3,
          transition:   "left .2s",
          boxShadow:    "0 1px 3px rgba(0,0,0,.2)",
        }} />
      </div>
      <span style={{ fontSize: font.size.base, color: colors.text.secondary, fontWeight: font.weight.medium }}>
        {label}
      </span>
    </label>
  );
}